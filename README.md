# domSelector linearGradient Test

Tests a bug in the `domSelector` library when selecting SVG `linearGradient` elements.

## Run Tests

**Node.js:**
```
npm install
npm test
```

## Results

- **Native querySelector**: ✅ WORKS - Finds linearGradient
- **domSelector Library**: ❌ FAILS - Cannot find linearGradient
- **Direct DOM Navigation**: ✅ WORKS - Confirms element exists

## Conclusion

Bug confirmed in domSelector library's implementation when handling SVG namespace elements.