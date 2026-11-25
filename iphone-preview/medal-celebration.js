// Track the highest medal actually presented on this device.
const medalReceiptKey = 'earth-odometer.celebrated-medal.v1';
let celebratedThrough = 0;
try { celebratedThrough = Number(localStorage.getItem(medalReceiptKey)) || 0; } catch {}
function celebrateMedals(earned, preview = false) {
  const goal = earned.reduce((highest, item) => item.target > highest.target ? item : highest);
  const others = earned.filter(item => item !== goal);
  const label = preview ? goal.title + ' preview' : 'You earned ' + goal.title;
  const share = !preview || medalMiles() >= goal.target
    ? contextShare('medal-' + medalGoals.indexOf(goal), 'Share medal') : '';
  open(label, '<div class="award-scene"><div class="award-stage">' + medalArt(goal) +
    '</div><div class="award-caption"><p>' + distanceText(goal.target) + ' of lifetime travel</p>' +
    (others.length ? '<details><summary>Also earned · ' + others.length + ' more</summary><p>' +
      others.map(item => item.title).join(' · ') + '</p></details>' : '') + share + '</div></div>');
  const stage = dialog.querySelector('.award-stage');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (let i = 0; i < 54; i++) {
      const piece = document.createElement('i');
      const right = i % 2 === 1;
      const spread = (i * 37 % 53) / 53;
      piece.setAttribute('aria-hidden','true');
      piece.style[right ? 'right' : 'left'] = '1%';
      piece.style.setProperty('--travel', (right ? -1 : 1) * (32 + spread * 120) + 'px');
      piece.style.setProperty('--peak', -(88 + (i * 31 % 115)) + 'px');
      piece.style.setProperty('--spin', (right ? -1 : 1) * (100 + i * 17) + 'deg');
      piece.style.animationDelay = (0.32 + (i % 5) * .025) + 's';
      piece.style.animationDuration = (1.25 + spread * .55) + 's';
      stage.append(piece);
    }
    setTimeout(() => {
      if (dialog.open && stage.isConnected && !document.hidden)
        window.webkit?.messageHandlers?.awardHaptic?.postMessage('catch');
    }, 350);
  }
}
function checkMedalAwards() {
  if (document.hidden || dialog.open || !recordedTotals()) return;
  if(pendingFinishes.length){showCompletion(pendingFinishes[0]);return;}
  const earned = medalGoals.filter(g => g.target > celebratedThrough && g.target <= medalMiles());
  if (!earned.length) return;
  celebrateMedals(earned);
  celebratedThrough = Math.max(...earned.map(g => g.target));
  try { localStorage.setItem(medalReceiptKey, String(celebratedThrough)); } catch {}
}
document.addEventListener('visibilitychange', checkMedalAwards);
dialog.addEventListener('close', () => requestAnimationFrame(checkMedalAwards));
