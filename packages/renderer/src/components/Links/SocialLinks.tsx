import { Icon, Link } from '@chakra-ui/react';
import { FaDiscord,
  FaExternalLinkAlt,
  FaGithub,
  FaReddit } from 'react-icons/fa';

import packageJSON from '../../../../../package.json';

export const GithubLink = () => {
  return (
    <Link isExternal href={packageJSON.repository.url}>
      Github <Icon as={FaGithub} />
    </Link>
  );
};

export const RedditLink = () => {
  return (
    <Link isExternal href="https://reddit.com/r/cloudfarm">
      r/cloudfarm <Icon as={FaReddit} />
    </Link>
  );
};

export const DiscordLink = () => {
  return (
    <Link isExternal href={packageJSON.homepage}>
      Discord <Icon as={FaDiscord} />
    </Link>
  );
};

export const HomepageLink = () => {
  return (
    <Link isExternal href="https://cloudfarm.us">
      cloudfarm.us <Icon as={FaExternalLinkAlt} />
    </Link>
  );
};
