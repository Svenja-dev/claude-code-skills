# SECOM Baseline Test

Test AI analysis with the SECOM dataset as a quality baseline.

## SECOM Dataset Properties:
- **Rows**: 1,567 (semiconductor manufacturing)
- **Columns**: 591 (sensor data)
- **Minority Class**: 6.6% (defect rate)
- **Time Period**: ~64 days

## Expected Results:
- **Data Quality Score**: 65-95% (variance acceptable)
- **Imbalanced Detection**: MUST be detected (6.6% minority)
- **Temporal Coverage**: ~64 days
- **Response Time**: <60s (typical serverless limit)

## Run Test:
1. Download SECOM.csv from UCI Repository
2. Upload via your application UI
3. Select appropriate analysis type (e.g., "Quality Control")
4. Compare results against baseline

## Reference:
The SECOM dataset is available at:
https://archive.ics.uci.edu/ml/datasets/SECOM

## When to Test:
- After changes to analysis endpoints
- After changes to data parsing logic
- After AI model updates
- After prompt modifications

---
## Origin

Originally developed for [fabrikIQ](https://fabrikiq.com) - AI-powered manufacturing data analysis.
