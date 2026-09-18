import { Link, useLocation } from 'react-router-dom'
import { Anchor, Breadcrumbs as MantineBreadcrumbs } from '@mantine/core'
import { useMemo } from 'react'

const Breadcrumbs = () => {
    const location = useLocation()
    const segments = useMemo(
        () => [
            <Anchor key={'home'} component={Link} to={'/'}>
                home
            </Anchor>,
            ...(location && location?.pathname
                ? location.pathname
                      .slice(1)
                      .split('/')
                      .map((segment, index, arr) => {
                          //get start from the beginning and build the route path
                          const trimmedSegments = arr.slice(0, index + 1)
                          return (
                              <Anchor
                                  // color={'black'}
                                  key={index}
                                  component={Link}
                                  to={'/' + trimmedSegments.join('/')}
                              >
                                  {segment}
                              </Anchor>
                          )
                      })
                : []),
        ],
        [location],
    )
    return (
        <MantineBreadcrumbs data-testid={'breadcrumbs'}>
            {segments}
        </MantineBreadcrumbs>
    )
}

export default Breadcrumbs
