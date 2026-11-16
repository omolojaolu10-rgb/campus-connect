import { useEffect } from 'react'

function usePageTitle(pageTitle) {
  useEffect(() => {
    document.title = `${pageTitle} | CampusConnect BU`
  }, [pageTitle])
}

export default usePageTitle
