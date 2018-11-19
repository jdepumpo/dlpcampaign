import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import Checkout from '../components/checkout'

const IndexPage = () => (
  <Layout>

    <h1>Hi there,</h1>
    <p>We need people like you in order to do x, y, and z.</p>
    <p>With your gift we can continue to save helpless animals from abuse and neglect. Every bit counts.</p>
    <p>Sincerely,</p>
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
    <Image />
    </div>

    <Checkout />
  </Layout>
)

export default IndexPage
