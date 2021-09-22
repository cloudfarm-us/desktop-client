import { DiscordLink,
  GithubLink,
  HomepageLink,
  RedditLink } from '../Links/SocialLinks';

type ErrorFallbackProps = { error: Error; resetErrorBoundary: () => void };

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  return (
    <div role="alert">
      <p>Whoops! Sorry looks like didn&apos;t go quite as expected...</p>
      <p>
        Please try reloading using the button below and if you continue to
        experience any problems or need some help, please reach out! In the mean
        time, you can read up on some FAQ over on our website <HomepageLink />,
        share experiences or ask other miners for help on our subreddit{' '}
        <RedditLink />, swing by to talk to our team directly at our official{' '}
        <DiscordLink />
        or even take a swing at our source code directly, it&apos;s all open
        source on <GithubLink />!
      </p>
      <pre>{error.message}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
};
