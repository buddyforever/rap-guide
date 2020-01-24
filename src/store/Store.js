import React from 'react';
import globalHook from 'use-global-hook';

const initialState = {
  videos: [
    {
      id: 1,
      videoId: `HuI2hL1QYrk`,
      embedUrl: `https://www.youtube.com/embed/HuI2hL1QYrk`,
      src: 'youtube',
      title: `Dylan`,
      album: {
        id: 1,
        title: `The Rap Guide to Consciousness`
      },
      credits: [
        {
          what: "Music produced and mixed",
          who: "Tom Caruana"
        },
        {
          what: "Keys",
          who: "Simon Kendall"
        },
        {
          what: "Cuts",
          who: "Mr. Simmonds"
        },
        {
          what: "Video animation",
          who: "Olivia Sebesky"
        },
      ],
      thumbnail: `https://picsum.photos/400/200`,
      topics: [`topic 1`, `topic 2`, `topic 3`],
      lyrics: [
        `Aww...`,
        `You know the feelin’ when you’re chillin’ like a villain`,
        `Dealin’ with no stress, like a room with no ceilin’`,
        `Just open, and you like the rhyme '–illin’`,
        `So much, you name your first son Dylan?`,
        `That’s the feelin’ I had November 12th`,
        `When I first held Dylan and fell under his spell`,
        `It was three days after the election from hell`,
        `When the Trump cartel captured Winterfell`,
        `Remember that feelin’?`,
        `Just ill and disgusted`,
        `With political drivel on Twitter from Trumpkins`,
        `Tellin’ us the civic discussion is critically busted?`,
        `You know that feelin’?`,
        `Well Dylan doesn’t`,
        `What’s it like to be a human baby?`,
        `Just a “blooming buzzing confusion” maybe?`,
        `I look in his eyes and try to read his thoughts and`,
        `Find myself wondering whether he’s got them`,
        `Or just sensations, chaotic and messy`,
        `I wanna relate, should I take some LSD?`,
        `So I can stop thinkin’ and just exist`,
        `I mean, look at the kid!`,
        `Ignorance is bliss…`,
        `You know the feelin’ when you find the right words`,
        `To express your thoughts, connect and get heard?`,
        `Y’all know that feelin’?`,
        `Yo, I know the feelin’`,
        `Animals don’t though, and neither does Dylan`,
        `You know the feelin’ of bladder control`,
        `When you don’t even go when you have to go?`,
        `Y’all know that feelin’?`,
        `Yo, I know the feelin’`,
        `Even dogs know that feelin’, but not Dylan`,
        `Dylan doesn’t know the feelin’ of regret`,
        `Or anticipation of future stress`,
        `Is he conscious?`,
        `Yes… or maybe not just yet`,
        `There could be several different levels of consciousness`,
        `Does he have a subjective perspective?`,
        `I guess so`,
        `But is it like a fish, or like a gecko?`,
        `The kid started out as a single cell`,
        `About a year ago, but don’t call it a “miracle”`,
        `Call it a triumph of modern medicine`,
        `Dylan was an excellent IVF specimen`,
        `I know ‘cause he spent a month in a freezer`,
        `So we could check his genes first and do research`,
        `Sometimes evolution needs a boost`,
        `And it worked too`,
        `Aww, he’s so cute`,
        `But when does he begin to be a mental self?`,
        `I’ve seen a picture of him at a hundred
        cells`,
        `And I wondered: when does consciousness emerge?`,
        `At the paramecium level, or nematode worm?`,
        `I was still a proud dad though`,
        `When the kid had a tail and gills`,
        `Like a tadpole`,
        `You know the feelin’ when you comprehend`,
        `And solve a problem that was tryin’ to box you in`,
        `You know that feelin’?`,
        `Yo, I know the feelin’`,
        `Animals don’t though, and neither does Dylan`,
        `You know the feelin’ when you wanna suck a boob`,
        `So bad that nothin’ but a nipple’s gonna
        do?`,
        `Who knows the feelin’?`,
        `Yo, I know the feelin’`,
        `Hetero men, lesbians, and Dylan`,
        `Baby mammals, they’re so beguiling`,
        `Dylan’s got skills, eating, smiling`,
        `Babbling a little bit of call and response`,
        `Communicating all of his needs and wants`,
        `But that doesn’t mean he knows what he’s doing`,
        `Planning, considering, executing`,
        `Yeah, Dylan’s got reasons to do stuff`,
        `But are they his reasons, or evolution’s?`,
        `A cuckoo chick doesn’t laugh or cry`,
        `It focusses on host chick infanticide`,
        `And if Dylan was a Barbary macaque`,
        `He’d be clingin’ instinctively to mama’s back`,
        `It’s easy to anthropomorphize the mind of an animal`,
        `But evolution is blind`,
        `And thinkin’ is costly`,
        `A baby bird doesn't need it`,
        `To get its mama to feed it`,
        `And Dylan doesn’t need to reflect on his cuteness`,
        `To recruit parental contributions`,
        `All he needs to do is “goo goo” and ooh child`,
        `Resistance is futile`,
        `You know the feelin’ when you make a whole plan`,
        `In your mind, strategize and revise and adapt?`,
        `Y’all know that feelin’?`,
        `Yo, I know the feelin’`,
        `Animals don’t though, and neither does Dylan`,
        `You know the feelin’ when you’re lost in a memory`,
        `Daydreamin’ off in a thoughtful revery`,
        `Y’all know that feelin’?`,
        `Yo, I know the feelin’`,
        `You and me see eye to eye, but not Dylan`,
      ]
    }
  ]
};

const actions = {

};

const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;