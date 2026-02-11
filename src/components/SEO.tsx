import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    name?: string;
    type?: string;
    url?: string;
    image?: string;
}

export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    name = 'Ashen Software',
    type = 'website',
    url = 'https://ashensoftware.com',
    image = 'https://ashensoftware.com/assets/og-image.png',
}) => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": name,
        "url": "https://ashensoftware.com",
        "logo": "https://ashensoftware.com/assets/logo/Logo-Iso.png",
        "description": description,
    };

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <link rel="canonical" href={url} />

            {/* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={name} />
            <meta property="og:image" content={image} />

            {/* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type === 'article' ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

