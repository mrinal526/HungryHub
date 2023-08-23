import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <footer class="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center">
          <Link to="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">

          </Link>
          <span class="mb-3 mb-md-0 text-muted r">© 2023 HungryHub, Inc</span>
        </div>
      </footer>
    </div>
  )
}
