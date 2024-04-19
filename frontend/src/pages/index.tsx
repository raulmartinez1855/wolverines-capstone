import { Layout } from "@/components/Layout/Layout";
import arch from "/public/arch.jpg";
import avatar from "/public/avatar.png";
import Image from "next/image";
import { Fragment, ReactNode } from "react";

const sections = [
  {
    sectionHeader: "Project Statement",
    textBlocks: [
      <>
        In recent years, the college football landscape has been dramatically
        impacted by the addition of the transfer portal. The transfer portal
        allows any college football player to transfer to a new school, with
        very few restrictions and, in most cases, the ability to play
        immediately the following season. This is a massive change, as before
        the implementation of the transfer portal, players had to go through a
        more stringent process, often having to obtain waivers to gain immediate
        eligibility to play at their new school. As a result of the transfer
        portal, schools and players are now dealing with a sort of “free agency”
        in college football, where every offseason teams not only have to manage
        the existing challenges of high school recruiting, but now must navigate
        the new complexities of keeping their own players from entering the
        portal, as well as identifying players who may enter the portal as
        potential additions to their program.
      </>,
      <>
        Since the transfer portal will continue to become an increasingly
        important aspect of modern college football moving forward, our team
        sought to build an application that utilizes available player and team
        statistics in conjunction with machine learning to predict the
        probability that a college football player will enter the transfer
        portal.
      </>,
    ],
  },
  {
    sectionHeader: "Methodology",
  },
  {
    sectionSubHeader: "Data Acquisition",
    textBlocks: [
      <>
        We utilized CollegeFootballData.com and their API in order to obtain the
        necessary data about players who have and have not entered the transfer
        portal from Power 5 programs since 2020. We chose to limit our initial
        scope to Power 5 schools, which are schools that are members of the ACC,
        SEC, PAC12, Big Ten, or Big Twelve conferences, since much of the
        complete data we had access to comes from these larger schools. We
        recognize however that teams outside the Power 5 have outperformed many
        Power 5 schools, and certainly have the ability to compete with the top
        Power 5 teams. A future iteration of our project will include data from
        non-Power 5 schools as well.
      </>,
      <>
        From CollegeFootballData.com, we obtained individual player usage
        metrics, which quantifies on average when and how often a particular
        player was on the field in a given season, as well as individual player
        statistics such as the number of touchdowns, yards, completions,
        carries, receptions, sacks, etc. Additionally, we obtained team
        statistics for each team for a given season. Finally, we were able to
        obtain data on which players have entered the transfer portal since
        2020.
      </>,
      <>
        We also used a coaching dataset from Bordering on Wisdom Sports
        Analytics
        (https://borderingonwisdom.wordpress.com/college-football-coach-database/).
        This dataset provided information about who the coach has been for each
        college football team since 1987.
      </>,
    ],
  },
  {
    sectionSubHeader: "Data Preprocessing",
    textBlocks: [
      <>
        After collecting the necessary player and team data, we began the
        process of cleaning and preprocessing our data into a more organized and
        usable format using NumPy and pandas. Since the various data points came
        in separate files, for each conference and each season from 2019 to
        2023, we first processed the individual data files by standardizing
        column names, and adjusting certain data to group statistics by player
        or team if necessary, and then merging the individual files together.
        Finally, using the same logic we merged all the individual datasets for
        each team and each season together to create a final comprehensive
        dataset containing all relevant statistics and transfer portal
        information for Power 5 players from 2019-2023.
      </>,
    ],
  },
  {
    sectionSubHeader: "Feature Engineering",
    textBlocks: [
      <>
        Our initial dataset consisted of a wide range of features, many of which
        were specific to certain position groups. For example, the statistic
        indicating the number of interceptions that a player had in a season
        would only be relevant to defensive players, while the number of
        receptions would only be relevant for offensive players. Additionally,
        our initial data analysis revealed an interesting breakdown of the
        percentage of each position group that has been in the transfer portal
        since 2020 [VISUAL GOES HERE]. Based on this, we decided to first break
        the initial dataset into multiple datasets corresponding to the
        following position groups: Quarterbacks (QB), Running Backs (RB), Wide
        Receivers/Tight Ends (WR/TE), and Defense. Due to the relatively smaller
        percentage of individual defensive position groups in the transfer
        portal and fewer distinct statistics among the defensive position
        groups, we decided to group all defensive positions together.
        Furthermore, at this time we have chosen to exclude the Offensive Line
        (OL) and Special Teams (ST) position groups, as we did not have enough
        data points for either of those positions to generate meaningful
        predictions.
      </>,
      <>
        For each position group, we narrowed down the original set of features
        to specific statistics that we felt were most important. For example,
        for the RB group we used statistics like number of carries, total
        rushing yards, total rushing touchdowns, etc. since those would be most
        relevant to the RB position, while excluding statistics that would not
        be applicable to the majority of running backs such as passing yards or
        sacks. We followed a similar approach for each position group, keeping
        relevant features and excluding irrelevant ones.
      </>,
      <>
        Using the narrowed features, we created a number of new, slightly more
        informative features that we felt would provide more insight into
        players who enter the transfer portal.
      </>,
      <>
        When high school players commit to play at a certain school, the head
        coach they will be playing under usually plays a significant role in
        that decision. Therefore any coaching changes might influence a player’s
        decision to enter the transfer portal. With this in mind we utilized our
        coaching data set and created a feature indicating whether after a
        particular season, a team had a head coaching change.
      </>,
    ],
  },
  {
    sectionSubHeader: "Machine Learning",
    textBlocks: [
      <>Talk about encoding pipeline and SMOTE</>,
      <>
        Add note about how since we are not using team or conference as
        predictors in our models, we feel that we can generalize the predictions
        from these models to non Power 5 players
      </>,
    ],
  },
  {
    sectionHeader: "Evaluation",
  },
  {
    sectionHeader: "Broader Impacts",
    textBlocks: [
      <>
        Since this project deals directly with predicting what decisions a
        player will make, it has the potential to deeply impact the player, the
        players family, coaching staffs, universities, and team fan bases.
      </>,
      <>
        Due to the nature of this project and the application of predicting
        whether or not a human will take an action, this project is subject to
        automation bias. Automation bias occurs when humans rely on an AI system
        to make a decision even when the system may be incorrect (Abbasi, J and
        Hswen, Y). For instance, if this tool was used at the end of every
        college football season for every player on a team and the decision
        makers at the institution used the predictions to make decisions on
        players.
      </>,
      <>
        This could have a negative impact on both players and the institution.
        If the tool predicts a high probability of a player transferring while
        the player has no intention of doing so, this prediction could
        negatively affect the relationship between the player and school. In
        addition, it could have the potential to negatively impact the earning
        potential of that student athlete, as NIL collectives would not want to
        invest additional money into a player who was perceived to be leaving
        the school.
      </>,
      <>
        From a university perspective, this tool could hurt the recruitment
        process. If the tool is used to automate which position groups the
        coaching staff should focus on recruiting due to predicted position
        transfer. This could lead to recruitment efforts for players positions
        which may not actually be needed.
      </>,
      <>
        With this being said, the tool is not recommended to be used in any form
        of decision making.
      </>,
    ],
  },
  {
    sectionHeader: "Web Application Overview DRAFT",
  },
  {
    sectionSubHeader: "Backend",
    textBlocks: [
      <>
        Flask was chosen as the application framework to host the backend web
        application logic. Flask was chosen for several reasons, the most
        important being that Flask is written in python and python is required
        to run the classification models. In addition, Flask is able to
        serialize and deserialize JSON requests and responses which is a very
        common form of communication between servers and would be required to
        communicate with the frontend server. To host the code, Heroku was
        chosen as the hosting platform due to its ease of use for deploying web
        applications, and ability to auto-deploy changes pushed to GitHub
        branches.
      </>,
      <>
        Trained models were saved as joblib files and loaded by the Flask
        application at build time. Doing this prevented the need to train the
        models during every deployment. The models are able to be used via two
        endpoints on the API.
      </>,
    ],
  },
  {
    sectionSubHeader: "Frontend",
    textBlocks: [
      <>
        NextJs was chosen as the application framework to host the frontend web
        application logic. This was done due to the team’s prior experience with
        the framework. In addition, to host the code Vercel was chosen as the
        hosting platform due to its extensive integration with NextJs and
        ability to auto-deploy changes pushed to GitHub branches.
      </>,
    ],
  },
  {
    sectionSubHeader: "Generating Predictions",
    textBlocks: [
      <>
        The frontend web application exposed the models created in two forms, a
        player form and a manual submission form.
      </>,
      <>
        The player form allows a user to select or search for a player who
        played during the 2023 season and generate a prediction on the
        probability of the player transferring schools. Each option in the
        player form is mapped to a unique player id. When the form is submitted,
        the frontend application sends an HTTP POST request to the backend
        server with the player id in JSON format. Once the backend server
        receives the request, it extracts the player id from the request. The
        server then matches the player id to a row in a pandas DataFrame which
        only contains information from the 2023 season. After a series of data
        manipulation steps, the player information routed to one of the models
        based on the position of the player. In the code blocks specific to
        position, there is additional data manipulation specific for the
        position specific classifier. The player information is passed as input
        to a model to generate a prediction using the predict_proba method. The
        backend server responds to the frontend with a list of dictionaries,
        contained in each dictionary is the name of the model and the
        probability of the prediction.
      </>,
      <>
        The manual submission form allows a user to manually input all the data
        which the model will use to generate a prediction. The request/response
        process works just as the player form does except that the input to
        model is sent directly in the HTTP POST request, there is no matching
        required with an existing player.
      </>,
    ],
  },
  {
    sectionSubHeader: "Version Control",
    textBlocks: [
      <>
        To collaborate, the team used a public GitHub repository. This allowed
        the team to push changes remotely, as well as provided the team with
        webhook functionality to automatically deploy changes to the chosen
        hosting platforms.
      </>,
    ],
  },
  {
    sectionSubHeader: "Architecture",
    textBlocks: [
      <>
        The application architecture consists of both a staging and production
        environment. The staging environment allows the team to test changes and
        fix bugs, before releasing the changes to the general public in
        production. Utilizing this architecture allowed for the team to use an
        iterative software development lifecycle, in which changes large and
        small can be delivered incrementally.
      </>,
      <>
        In addition, the use of the Vercel and Heroku as hosting platforms
        allowed for build pipelines to be created between the GitHub repository
        and the hosting platforms. Specifically, whenever changes were pushed to
        the production branch or a staging branch in the repository, the
        repository would automatically be deployed to both the frontend and
        backend hosting platforms. With this approach, new changes would reflect
        usually within 120 seconds of pushing changes to the repository.
      </>,
      <>
        <Image src={arch} alt="architecture overview image" />
      </>,
    ],
  },
  {
    sectionHeader: "Citations",
    textBlocks: [
      <>
        Abbasi J, Hswen Y. Blind Spots, Shortcuts, and Automation
        Bias—Researchers Are Aiming to Improve AI Clinical Models. JAMA.
        2024;331(11):903–906. doi:10.1001/jama.2023.28262
      </>,
    ],
  },
].map((v, i) => ({ ...v, id: i + 1 }));

export default function HomePage() {
  return (
    <Layout>
      <div className="pb-[10rem]">
        {sections.map((v) => (
          <Fragment key={v.id}>
            {v.sectionHeader && (
              <WhitePaperHeader>{v.sectionHeader}</WhitePaperHeader>
            )}
            {v.sectionSubHeader && (
              <WhitePaperSubHeader>{v.sectionSubHeader}</WhitePaperSubHeader>
            )}
            {v.textBlocks &&
              v.textBlocks.map((tb, i) => (
                <WhitePaperText key={Math.random() + i}>{tb}</WhitePaperText>
              ))}
          </Fragment>
        ))}
      </div>
      <div className="">
        <WhitePaperHeader>Team Wolverines</WhitePaperHeader>
        <div className="flex justify-between">
          <div className="max-w-xl text-center">
            <Image src={avatar} alt="team member image" />
            <WhitePaperHeader>Jeffrey Jones</WhitePaperHeader>
            <WhitePaperText>Data Cleaning Commander</WhitePaperText>
            <WhitePaperText>Column Transformation Titan</WhitePaperText>
            <WhitePaperText>Logistic Regression Raider</WhitePaperText>
          </div>
          <div className="max-w-xl text-center">
            <Image src={avatar} alt="team member image" />
            <WhitePaperHeader>Yash Dave</WhitePaperHeader>
            <WhitePaperText>Data Manipulation Maestro</WhitePaperText>
            <WhitePaperText>CSV Chef</WhitePaperText>
            <WhitePaperText>Gradient Boosting Boss</WhitePaperText>
          </div>
          <div className="max-w-xl text-center">
            <Image src={avatar} alt="team member image" />
            <WhitePaperHeader>Raul Martinez</WhitePaperHeader>
            <WhitePaperText>Web App Wrangler</WhitePaperText>
            <WhitePaperText>Software Sage</WhitePaperText>
            <WhitePaperText>Git Pipeline Plumber</WhitePaperText>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function WhitePaperHeader({ children }: { children: ReactNode }) {
  return <h3 className="text-4xl mb-[2.4rem] font-bold">{children}</h3>;
}

function WhitePaperSubHeader({ children }: { children: ReactNode }) {
  return <h3 className="text-3xl mb-[2.4rem] font-medium">{children}</h3>;
}

function WhitePaperText({ children }: { children: ReactNode }) {
  return <p className="text-[1.4rem] mb-[2.4rem]">{children}</p>;
}
