import React from 'react'
import { Link } from 'gatsby'
import HeadImage from '../components/headimage'

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: 'white',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '3rem 0',
      }}
    >
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
              <div style={{ maxWidth: '800px', marginBottom: '2rem', margin: 'auto' }}>
      <HeadImage />
      </div>
        </Link>
    </div>
  </div>
)

export default Header
