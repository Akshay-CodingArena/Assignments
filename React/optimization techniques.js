// FCP and LCP

// Reduce the image size. Format is .webp and size should be below 200 Kb.
// Code Splitting - Use React.lazy to import files.
// Use intersection Observer to load the content on the scroll.
// Use Preload, Preconnect Tags to load the important assets on priority for LCP and FCP.
// Minify css at the build time using any Css Nano, AutoPrefixer for cross browser compatibility.
// Split the css file module wise instead of one big file. Can use chrome coverage report to get which css properties are being used on the page.
// Use HOC React.memo, useCallback and useMemo to remove the unnecessary rendering and recalculation.
// Enable gzip encoding if it isn't.
// Can use caching for the data that is not dynamic in nature. Eg ( statelist & citylist api's )
// Can load Google Tag Manager script after the page is loaded fully. This will remove third party load.

// CLS

// use explicit height and width for the containers.
// make sure the css files are not changing the same property of the same element.
