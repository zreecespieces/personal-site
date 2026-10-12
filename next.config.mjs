/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Only image fields in content data, not outbound links or MDX content.
    // Add new source hosts/paths here when adding content. Queries are allowed
    // because several archived image endpoints require transformation parameters.
    remotePatterns: [
      ["assets.vogue.com", "/photos/**"],
      ["bouldercolorado.gov", "/sites/default/files/**"],
      ["cdn.5280.com", "/2015/07/**"],
      ["cdn.britannica.com", "/**"],
      ["cdn.kastatic.org", "/genfiles/topic-icons/icons/**"],
      ["coloradobirdingtrail.com", "/wp-content/uploads/**"],
      ["comedyworks.com", "/rails/active_storage/blobs/redirect/*/TJ_Miller_Sq.jpg"],
      [
        "comedyworks.com",
        "/rails/active_storage/blobs/redirect/*/BryanCallen-comedian-denver-1.jpg",
      ],
      [
        "comedyworks.com",
        "/rails/active_storage/blobs/redirect/*/JamesMcCann-comedian-denver-1.jpg",
      ],
      [
        "comedyworks.com",
        "/rails/active_storage/blobs/redirect/*/Jeremiah-Watkins-comedian-denver-1.jpg",
      ],
      [
        "comedyworks.com",
        "/rails/active_storage/blobs/redirect/*/Timmy-No-Breaks-comedian-denver-1.jpg",
      ],
      [
        "comedyworks.com",
        "/rails/active_storage/blobs/redirect/*/AriShaffir-comedian-denver-1_14_.jpg",
      ],
      ["i.scdn.co", "/image/**"],
      ["i.ticketweb.com", "/i/**"],
      ["i.ytimg.com", "/vi/**"],
      ["i0.wp.com", "/travel2walk.com/wp-content/uploads/**"],
      ["i0.wp.com", "/www.travelworldmagazine.com/wp-content/uploads/**"],
      ["images.alltrails.com", "/**"],
      ["images.alphacoders.com", "/885/**"],
      ["images.musement.com", "/cover/**"],
      ["images.penguinrandomhouse.com", "/cover/**"],
      ["images.squarespace-cdn.com", "/content/v1/587aec812994ca23948fd074/**"],
      ["img-c.udemycdn.com", "/course/480x270/2534378_1ac2_2.jpg"],
      ["img-c.udemycdn.com", "/course/480x270/3480632_eb33_3.jpg"],
      ["img-c.udemycdn.com", "/course/480x270/5716276_dbcc_3.jpg"],
      ["komi-production-assets.s3-accelerate.amazonaws.com", "/photos/**"],
      ["m.media-amazon.com", "/images/I/**"],
      ["media.newyorker.com", "/photos/**"],
      ["peakvisor.com", "/img/news/**"],
      ["raw.githubusercontent.com", "/zreecespieces/kokoro-pi/main/docs/banner.png"],
      ["resizing.flixster.com", "/**"],
      ["s1.ticketm.net", "/dam/a/**"],
      ["seated.imgix.net", "/82178804-4012-459d-9ad8-eee9b643160a/**"],
      ["statemag.state.gov", "/wp-content/uploads/**"],
      ["static01.nyt.com", "/images/**"],
      ["upload.wikimedia.org", "/wikipedia/commons/**"],
      ["www.alltrails.com", "/_next/image"],
      ["www.alltrails.com", "/api/alltrails/v2/trails/*/photos/*"],
      ["www.alltrails.com", "/api/alltrails/v2/maps/*/photos/*"],
      ["www.citrusmilo.com", "/yosemite2017/**"],
      ["www.ihcottages.com", "/wp-content/uploads/**"],
      ["www.nationalgeographic.com", "/content/dam/expeditions/**"],
      ["www.news-herald.com", "/wp-content/uploads/**"],
      ["www.spain.info", "/export/sites/segtur/.content/imagenes/**"],
      ["www.yosemite.com", "/wp-content/uploads/**"],
    ].map(([hostname, pathname]) => ({ protocol: "https", hostname, port: "", pathname })),
  },
  async rewrites() {
    return [
      {
        source: "/instant-perler-pattern/:path*",
        destination: "https://perler-pattern-generator.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
