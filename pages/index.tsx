import Image from "next/image";

import { client } from "../sanity/lib/client";
import { urlForImage } from "../sanity/lib/image";

export default function IndexPage({ home }) {
  const { logo, heading } = home;
  const logoSrc = urlForImage(logo).url()

  return (
    <div>
      <h1>{heading}</h1>
      <Image
        src={logoSrc}
        loader={() => logoSrc}
        alt="logo"
        width={560}
        height={560}
      />
    </div>
  )
}

export async function getStaticProps() {
  const sanity = await client.fetch(`*[_type == "home"] {
      logo,
      heading
    }[0]
  `);

  return {
    props: {
      home: sanity,
    }
  };
}