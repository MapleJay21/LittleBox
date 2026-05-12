"use client";

type BlogPostTemplateProps = {
  title: string;
};

export function BlogPostTemplate({ title }: BlogPostTemplateProps) {
  return (
    <>
      <link rel="stylesheet" href="/tokyo/tokyo.css" />
      <div className="header-section">
        <div className="w-container">
          <a href="/example" className="blog-home-link w-inline-block">
            <h1 className="blog-name">TOKYO</h1>
          </a>
          <div className="navigation-bar">
            <a href="/example" className="nav-link">blog</a>
            <a href="#" className="nav-link">about</a>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="w-container">
          <img alt="" src="/tokyo/5e4b1ad5ea2f4655f5e99668_photo-1443610662308-74e383d24fbe.jpg" className="main-image" />
          <h1 data-w-expand="category" className="post-heading">{title === "Blog Post One" ? "Soaking in the colors" : title === "Blog Post Two" ? "Soaking in the colors" : "Soaking in the colors"}</h1>
          <div className="byline-wrapper">
            <div className="byline-text">October 1, 2015</div>
            <div className="byline-text">In</div>
            <a href="#" className="byline-link">Sports</a>
          </div>
          <div className="blog-content w-richtext">
            <p>The night was dark. The moon, on the wane, scarcely left the horizon, and was covered with heavy clouds; the height of the trees deepened the darkness.</p>
            <h2>It was not enough to reach the walls</h2>
            <p>It was not enough to reach the walls; an opening in them must be accomplished, and to attain this purpose the party only had their pocket-knives. Happily the temple walls were built of brick and wood, which could be penetrated with little difficulty; after one brick had been taken out, the rest would yield easily.</p>
            <p>They set noiselessly to work, and the Parsee on one side and Passepartout on the other began to loosen the bricks so as to make an aperture two feet wide. They were getting on rapidly, when suddenly a cry was heard in the interior of the temple, followed almost instantly by other cries replying from the outside. Passepartout and the guide stopped. Had they been heard? Was the alarm being given?</p>
            <h2>The guards now appeared at the rear of the temple</h2>
            <p>Common prudence urged them to retire, and they did so, followed by Phileas Fogg and Sir Francis. They again hid themselves in the wood, and waited till the disturbance, whatever it might be, ceased, holding themselves ready to resume their attempt without delay. But, awkwardly enough, the guards now appeared at the rear of the temple, and there installed themselves, in readiness to prevent a surprise.</p>
            <p>It would be difficult to describe the disappointment of the party, thus interrupted in their work. They could not now reach the victim; how, then, could they save her? Sir Francis shook his fists, Passepartout was beside himself, and the guide gnashed his teeth with rage. The tranquil Fogg waited, without betraying any emotion.</p>
            <h2>With the ten warriors</h2>
            <p>In this way, with ten warriors, I built a series of three steps from the ground to the shoulders of the topmost man. Then starting from a short distance behind them I ran swiftly up from one tier to the next, and with a final bound from the broad shoulders of the highest I clutched the top of the great wall and quietly drew myself to its broad expanse.</p>
            <p>After me I dragged six lengths of leather from an equal number of my warriors. These lengths we had previously fastened together, and passing one end to the topmost warrior I lowered the other end cautiously over the opposite side of the wall toward the avenue below. No one was in sight, so, lowering myself to the end of my leather strap, I dropped the remaining thirty feet to the pavement below.</p>
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
