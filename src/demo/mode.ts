export const isPortfolioDemo = import.meta.env.VITE_PORTFOLIO_DEMO === 'true'

if (isPortfolioDemo && import.meta.env.VITE_VISITOR_DEMO === 'true') {
    throw new Error('Choose the static demo or the visitor API, not both.')
}
