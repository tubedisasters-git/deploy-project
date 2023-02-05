import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    image:
      "https://upload.wikimedia.org/wikipedia/en/b/b2/Attack_The_Block_2.jpg",
    title: "My First Meetup",
    address: "An Address",
  },
  {
    id: "m2",
    image:
      "https://upload.wikimedia.org/wikipedia/en/b/b2/Attack_The_Block_2.jpg",
    title: "My Second Meetup",
    address: "Another Address",
  },
];
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>All the meetups for the lecture</title>
        <meta name="description" content="A big list of meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://tubedisasters:televi5edM1nd$@cluster0.ixbewm7.mongodb.net/meetupsdb?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const dataArray = await meetupsCollection.find().toArray();
  console.log("Meetups now: " + dataArray.length);

  return {
    props: {
      meetups: dataArray.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
      revalidate: 1,
    },
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
export default HomePage;
