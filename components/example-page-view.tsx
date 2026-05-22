"use client";

import { Link } from "react-router-dom";

const tokyoAsset = (name: string) => `${import.meta.env.BASE_URL}tokyo/${name}`;

export function ExamplePageView() {
  return (
    <>
      <link rel="stylesheet" href={tokyoAsset("tokyo.css")} />
      <div className="header-section">
        <div className="w-container">
          <Link to="/example" aria-current="page" className="blog-home-link w-inline-block w--current">
            <h1 className="blog-name">正是修炼时</h1>
          </Link>
          <div className="navigation-bar">
            <Link to="/example" aria-current="page" className="nav-link w--current">
              blog
            </Link>
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
                <Link to="/blog-posts/one" className="post-link w-inline-block">
                  <img alt="" src={tokyoAsset("5e4b1ad5ea2f4655f5e99668_photo-1443610662308-74e383d24fbe.jpg")} className="main-image" />
                </Link>
                <div className="heading-wrapper">
                  <h1 className="blog-headline">梦开始的地方</h1>
                  <div className="byline-wrapper">
                    <div className="byline-text">May 20, 2026</div>
                  </div>
                </div>
                <p className="blog-content-text">
                  我不知道是出于什么原因和目的搭建了这个网站
                </p>
                <p className="blog-content-text">
                  可能是为了记录一些重要的时刻
                </p>
                <p className="blog-content-text">
                  也可能是想分享一些有趣的事物
                </p>
                <p className="blog-content-text">
                  总而言之就这样
                </p>
                <p className="blog-content-text">
                  If you happen to come across this website
                </p>
                <p className="blog-content-text">
                  I wish you a smooth and successful life
                </p>
              </div>
              {/*<div role="listitem" className="blog-post w-dyn-item">*/}
              {/*  <Link to="/blog-posts/two" className="post-link w-inline-block">*/}
              {/*    <img alt="" src={tokyoAsset("5e4b1ad5ea2f462a99e99670_photo-1444072934215-c426fc67ab9c.jpg")} className="main-image" />*/}
              {/*  </Link>*/}
              {/*  <div className="heading-wrapper">*/}
              {/*    <h1 className="blog-headline">As we fall into the earth</h1>*/}
              {/*    <div className="byline-wrapper">*/}
              {/*      <div className="byline-text">February 28, 2020</div>*/}
              {/*      <div className="byline-text">IN</div>*/}
              {/*      <a href="#" className="byline-link">Music</a>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <p className="blog-content">*/}
              {/*    In this way, with ten warriors, I built a series of three steps from the ground to the shoulders of the topmost man. Then starting from a short distance behind them I ran swiftly up from one tier to the next, and with a final bound from the broad shoulders of the highest I clutched the top of the great wall and quietly drew myself to its broad expanse. After me I dragged six lengths of leather from an equal number of my warriors.*/}
              {/*  </p>*/}
              {/*  <Link to="/blog-posts/two" className="link-to-page">Read More</Link>*/}
              {/*</div>*/}
              {/*<div role="listitem" className="blog-post w-dyn-item">*/}
              {/*  <Link to="/blog-posts/three" className="post-link w-inline-block">*/}
              {/*    <img alt="" src={tokyoAsset("5e4b1ad5ea2f46c2ece9966c_photo-1429277096327-11ee3b761c93.jpg")} className="main-image" />*/}
              {/*  </Link>*/}
              {/*  <div className="heading-wrapper">*/}
              {/*    <h1 className="blog-headline">Reaching majesty</h1>*/}
              {/*    <div className="byline-wrapper">*/}
              {/*      <div className="byline-text">February 28, 2020</div>*/}
              {/*      <div className="byline-text">IN</div>*/}
              {/*      <a href="#" className="byline-link">Entertainment</a>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <p className="blog-content">*/}
              {/*    The scent of hay was in the air through the lush meadows beyond Pyrford, and the hedges on either side were sweet and gay with multitudes of dog-roses. The heavy firing that had broken out while we were driving down Maybury Hill ceased as abruptly as it began, leaving the evening very peaceful and still. We got to Leatherhead without misadventure about nine o&apos;clock, and the horse had an hour&apos;s rest while I took supper with my cousins and commended my wife to their care.*/}
              {/*  </p>*/}
              {/*  <Link to="/blog-posts/three" className="link-to-page">Read More</Link>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="w-container">
          <div>
            <a href="#" className="social-icon-link w-inline-block"><img src={tokyoAsset("5e4b1ad5ea2f467cbee996de_social-03.svg")} width="20" alt="" /></a>
            <a href="#" className="social-icon-link w-inline-block"><img src={tokyoAsset("5e4b1ad5ea2f46c54ee99695_social-18.svg")} width="20" alt="" /></a>
            <a href="#" className="social-icon-link w-inline-block"><img src={tokyoAsset("5e4b1ad5ea2f464178e996fd_social-30.svg")} width="20" alt="" /></a>
          </div>
          <div className="footer-text">不过是些许风霜罢了</div>
        </div>
      </div>
    </>
  );
}
