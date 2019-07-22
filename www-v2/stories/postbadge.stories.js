import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, date } from '@storybook/addon-knobs';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import { Button, Welcome } from '@storybook/react/demo'
// import HelloWorld from '../components'
import PostBadge from '../components/PostBadge';

storiesOf('Common Components', module).addDecorator(withKnobs).add('PostBadge', () => {
  const postTitle = text('postTitle', 'place title here');
  const updated = date('updated', new Date());
  return <PostBadge postTitle={postTitle} updated={updated} />;
});

// storiesOf('Welcome', module).add('to Storybook', () => (
//   <Welcome showApp={linkTo('Button')} />
// ))

// storiesOf('Button', module)
//   .add('with text', () => (
//     <Button onClick={action('clicked')}>Hello Button</Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role='img' aria-label='so cool'>
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ))

// storiesOf('HelloWorld', module).add('simple component', () => <HelloWorld />)
