import React from 'react';
import Link from 'next/link'


export default () => {
  return <div>dsfgfsdg<Link href={{ pathname: '/hello', query: { name: 'Zeit' } }}>
      <a>here</a>
    </Link>{' '}</div>;
}
