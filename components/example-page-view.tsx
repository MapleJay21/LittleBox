"use client";

import Link from "next/link";

export function ExamplePageView() {
  return (
    <>
      <link rel="stylesheet" href="/tokyo/tokyo.css" />
      <div className="header-section">
        <div className="w-container">
          <a href="/example" aria-current="page" className="blog-home-link w-inline-block w--current">
            <h1 className="blog-name">TOKYO</h1>
          </a>
          <div className="navigation-bar">
            <a href="/example" aria-current="page" className="nav-link w--current">
              blog
            </a>
            <a href="#" className="nav-link">
              about
            </a>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="w-container">
          <div className="content-wrapper w-dyn-list">
            <div role="list" className="w-dyn-items">
              <div role="listitem" className="blog-post w-dyn-item">
                <Link href="/blog-posts/one" className="post-link w-inline-block">
                  <img alt="" src="/tokyo/5e4b1ad5ea2f4655f5e99668_photo-1443610662308-74e383d24fbe.jpg" className="main-image" />
                </Link>
                <div className="heading-wrapper">
                  <h1 className="blog-headline">Soaking in the colors</h1>
                  <div className="byline-wrapper">
                    <div className="byline-text">February 28, 2020</div>
                    <div className="byline-text">IN</div>
                    <a href="#" className="byline-link">Sports</a>
                  </div>
                </div>
                <p className="blog-content">
                  After me I dragged six lengths of leather from an equal number of my warriors. These lengths we had previously fastened together, and passing one end to the topmost warrior I lowered the other end cautiously over the opposite side of the wall toward the avenue below. No one was in sight, so, lowering myself to the end of my leather strap, I dropped the remaining thirty feet to the pavement below.
                </p>
                <Link href="/blog-posts/one" className="link-to-page">Read More</Link>
              </div>
              <div role="listitem" className="blog-post w-dyn-item">
                <Link href="/blog-posts/two" className="post-link w-inline-block">
                  <img alt="" src="/tokyo/5e4b1ad5ea2f462a99e99670_photo-1444072934215-c426fc67ab9c.jpg" className="main-image" />
                </Link>
                <div className="heading-wrapper">
                  <h1 className="blog-headline">As we fall into the earth</h1>
                  <div className="byline-wrapper">
                    <div className="byline-text">February 28, 2020</div>
                    <div className="byline-text">IN</div>
                    <a href="#" className="byline-link">Music</a>
                  </div>
                </div>
                <p className="blog-content">
                  In this way, with ten warriors, I built a series of three steps from the ground to the shoulders of the topmost man. Then starting from a short distance behind them I ran swiftly up from one tier to the next, and with a final bound from the broad shoulders of the highest I clutched the top of the great wall and quietly drew myself to its broad expanse. After me I dragged six lengths of leather from an equal number of my warriors.
                </p>
                <Link href="/blog-posts/two" className="link-to-page">Read More</Link>
              </div>
              <div role="listitem" className="blog-post w-dyn-item">
                <Link href="/blog-posts/three" className="post-link w-inline-block">
                  <img alt="" src="/tokyo/5e4b1ad5ea2f46c2ece9966c_photo-1429277096327-11ee3b761c93.jpg" className="main-image" />
                </Link>
                <div className="heading-wrapper">
                  <h1 className="blog-headline">Reaching majesty</h1>
                  <div className="byline-wrapper">
                    <div className="byline-text">February 28, 2020</div>
                    <div className="byline-text">IN</div>
                    <a href="#" className="byline-link">Entertainment</a>
                  </div>
                </div>
                <p className="blog-content">
                  The scent of hay was in the air through the lush meadows beyond Pyrford, and the hedges on either side were sweet and gay with multitudes of dog-roses. The heavy firing that had broken out while we were driving down Maybury Hill ceased as abruptly as it began, leaving the evening very peaceful and still. We got to Leatherhead without misadventure about nine o&apos;clock, and the horse had an hour&apos;s rest while I took supper with my cousins and commended my wife to their care.
                </p>
                <Link href="/blog-posts/three" className="link-to-page">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="w-container">
          <div>
            <a href="#" className="social-icon-link w-inline-block"><img src="/tokyo/5e4b1ad5ea2f467cbee996de_social-03.svg" width="20" alt="" /></a>
            <a href="#" className="social-icon-link w-inline-block"><img src="/tokyo/5e4b1ad5ea2f46c54ee99695_social-18.svg" width="20" alt="" /></a>
            <a href="#" className="social-icon-link w-inline-block"><img src="/tokyo/5e4b1ad5ea2f464178e996fd_social-30.svg" width="20" alt="" /></a>
          </div>
          <div className="footer-text">Powered by Webflow</div>
        </div>
      </div>
    </>
  );
}
