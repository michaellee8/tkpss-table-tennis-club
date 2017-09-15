import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Comment from './Comment';

function handler(type: string) {
  switch (type) {
    case 'delete':
      action('delete comment');
      console.log('delete comment');
      break;
    case 'navToWriter':
      action('go to comment writer');
      console.log('go to comment writer');
      break;
    default:
  }
}

storiesOf('Component/Comment/asUser', module)
  .add('Photo as Avatar', () => (
    <Comment
      user={{
        displayName: 'Michael Test',
        photoUrl:
          'https://is1-ssl.mzstatic.com/image/thumb/Purple111/v4/4a/be/60/4abe60e1-6bec-5eb4-ecc5-a4c35771977f/source/512x512bb.jpg'
      }}
      isAdmin={false}
      content="test comment as user with photo as avatar"
      interactionHandler={handler}
    />
  ))
  .add('Name as Avatar', () => (
    <Comment
      user={{
        displayName: 'Michael Test'
      }}
      isAdmin={false}
      content="test comment as user with name as avatar"
      interactionHandler={handler}
    />
  ));

storiesOf('Component/Comment/asAdmin', module)
  .add('Photo as Avatar', () => (
    <Comment
      user={{
        displayName: 'Michael Test',
        photoUrl:
          'https://is1-ssl.mzstatic.com/image/thumb/Purple111/v4/4a/be/60/4abe60e1-6bec-5eb4-ecc5-a4c35771977f/source/512x512bb.jpg'
      }}
      isAdmin={true}
      content="test comment as admin with photo as avatar"
      interactionHandler={handler}
    />
  ))
  .add('Name as Avatar', () => (
    <Comment
      user={{
        displayName: 'Michael Test'
      }}
      isAdmin={true}
      content="test comment as admin with name as avatar"
      interactionHandler={handler}
    />
  ));
