# Quality Gates

Run the project Quality Gates:

1. **TypeScript Check**: `npx tsc --noEmit`
2. **Build**: `npm run build`
3. **Unit Tests**: `npm run test`

## On Errors:
- Show **file:line** for each error
- Propose concrete fix
- Wait for confirmation before implementing

## On Success:
- Show summary (duration, test count, build size)
- Ask if commit is desired

## Optional Parameter:
`$ARGUMENTS` - Specific component/file to test

---
## Origin

Originally developed for [fabrikIQ](https://fabrikiq.com) - AI-powered manufacturing data analysis.
