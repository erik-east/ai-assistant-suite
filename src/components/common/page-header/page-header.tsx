import Head from "next/head";

interface PageHeaderProps {
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/Epic-Handshake.jpg" />
    </Head>
  );
};
