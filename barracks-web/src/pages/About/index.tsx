import { IconButton, Stack, Stat } from '@fjlaubscher/matter';
import { FaGithub } from 'react-icons/fa';

// components
import AppLayout from '../../components/AppLayout';

import styles from './About.module.scss';

const DESCRIPTION = `As a fellow tabletop gaming enthusiast, I'm thrilled to introduce you to Barracks — a personal hobby project of mine designed to enhance your experience with Warlord Games' popular wargame, Bolt Action.
Barracks is an open-source app built entirely on web technologies, providing you with an intuitive and convenient platform for two essential aspects of the game: rules references and army list building.

Barracks is not associated with or endorsed by Warlord Games, the publisher of Bolt Action.`;

const About = () => (
  <AppLayout
    title="About"
    description={DESCRIPTION}
    action={
      <a href="https://github.com/fjlaubscher/barracks" target="_blank">
        <IconButton>
          <FaGithub />
        </IconButton>
      </a>
    }
  >
    <Stack className={styles.about} direction="column">
      <Stat title="Barracks" value="What is Barracks?" />
      <p>
        As a fellow tabletop gaming enthusiast, I'm thrilled to introduce you to Barracks — a
        personal hobby project of mine designed to enhance your experience with Warlord Games'
        popular wargame, Bolt Action.
      </p>
      <p>
        Barracks is an open-source app built entirely on web technologies, providing you with an
        intuitive and convenient platform for two essential aspects of the game: rules references
        and army list building.
      </p>
      <h4>Rules</h4>
      <p>
        Find quick references to rules from the Bolt Action rulebook, as well as the 5 major army
        books at your fingertips.
        <br />
        Say goodbye to flipping through pages or searching through multiple sources — Barracks has
        you covered.
        <br />
        Hopefully! 😅
      </p>
      <h4>Army Lists</h4>
      <p>
        Tailor army lists to your playstyle, fine-tune existing army lists or experiment with new
        strategies. Barracks makes it seamless and efficient to construct your perfect force.
        <br />
        Get ready to dominate the battlefield!
      </p>
      <h4>Why?</h4>
      <p>
        Barracks is a personal project, fueled by my passion for software development, and of
        course, Bolt Action.
        <br /> While the app currently focuses on rules references and army building, it is an
        evolving endeavor.
        <br />
        Your feedback, contributions, and feature requests are crucial in shaping its future
        development.
      </p>
      <blockquote>
        Data privacy is a top priority for me while developing Barracks.
        <br />
        The app does not store any personal information anywhere.
        <br />
        <br />
        Army lists are stored locally on your device, unless created publicly.
        <br /> When choosing to create (and sync) public army lists, the data is stored on a
        Cloudflare Worker and associated with a your unique Google account identifier.
        <br />
        <br />
        No email addresses, no personal information.
        <br />
        <br />
        <a className={styles.title} href="https://github.com/fjlaubscher/barracks" target="_blank">
          Barracks is free and open-source software.
        </a>
        <p>Barracks is not associated with or endorsed by Warlord Games.</p>
        <p>
          <br />
          Made with ❤️ by{' '}
          <a className={styles.title} href="https://francoislaubscher.dev" target="_blank">
            francoislaubscher.dev
          </a>
        </p>
      </blockquote>
    </Stack>
  </AppLayout>
);

export default About;
