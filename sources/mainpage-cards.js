
// // Fifth Section - Card
// var next = document.getElementById("next");
// var previous = document.getElementById("previous");
// var cardGroup = document.getElementById("card-group");
// let currentOffset = -Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--half-card-width'));
// let currentMarginOffset = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-gap'));
// next.onclick = () => {
//     var stepO = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--half-card-width')) * 2;
//     var stepMO = -2 * Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-gap'));
//     currentOffset -= stepO;
//     currentMarginOffset -= stepMO;
//     cardGroup.animate([
//         // from
//         { left: `calc(50% + ${currentOffset + stepO}px - ${currentMarginOffset + stepMO}px)` },
//         // to
//         { left: `calc(50% + ${currentOffset}px - ${currentMarginOffset}px)` }
//     ], {
//         duration: 1000, // 1 second
//         easing: "ease",
//         fill: "forwards"
//     });
// };
// previous.onclick = () => {
//     var stepO = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--half-card-width')) * 2;
//     var stepMO = -2 * Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-gap'));
//     currentOffset += stepO;
//     currentMarginOffset += stepMO;
//     cardGroup.animate([
//         // from
//         { left: `calc(50% + ${currentOffset - stepO}px - ${currentMarginOffset - stepMO}px)` },
//         // to
//         { left: `calc(50% + ${currentOffset}px - ${currentMarginOffset}px)` }
//     ], {
//         duration: 1000, // 1 second
//         easing: "ease",
//         fill: "forwards"
//     });
// };