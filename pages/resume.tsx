import Head from 'next/head'
import styles from '../styles/Resume.module.scss'
import Devicon from '../components/Devicon'
import { getResumeData } from '../utils/lib'
import { FC } from 'react';
import Link from 'next/link'

import NavBar from '../components/Masthead';

type ContactProps = {
  contact: {
    name: string,
    location: string,
    email: string,
    urls: string[]
  }
}

type ProfileProps = {
  profile: string
}

type SkillsProps = {
  skills: [{
    name: string,
    score: number,
  }]
}

type ExperienceProps = {
  experience: [
    {
      title: string,
      years: string[],
      description: string[],
      skills: [{
        name: string,
        score: number,
      }],
    }
  ]
}

type SampleProps = {
  workSamples: [
    {
      title: string,
      url: string,
      year: string,
      description: string,
      tech: string[]
    }
  ]  
}
type ResumeProps = {
  resumeData: {
    contact: {
      name: string,
      location: string,
      email: string,
      urls: [string]
    },
    profile: string,
    skills: [{
      name: string,
      score: number,
    }],
    experience: [
      {
        title: string,
        years: [string],
        description: [string],
        skills: [{
          name: string,
          score: number,
        }],
      }
    ],
    workSamples: [
      {
        title: string,
        url: string,
        year: string,
        description: string,
        tech: [string]
      }
    ]
  }
}

const ContactBlock = ({contact}:ContactProps) => {
  return (
    <section className={ styles.contact }>
      <h1 className={styles.sectionHed}>{ contact.name }</h1>
      <div>
        <p>{ contact.location }</p>
        <p><a href={`mailto:${contact.email}`}>{ contact.email }</a></p>
        <p>
          { contact.urls.map(url => {
            return <span key={url}><Link href={`https://${url}`}>{ url }</Link><br /></span>
          }) }
        </p>
      </div>
    </section>
  );
}

const ProfileBlock = ({profile}:ProfileProps) => {
  return (
    <section className={ styles.profile }>
      <h2 className={styles.sectionHed}>Profile</h2>
      <div>
        <p>{profile}</p>
      </div>
    </section>    
  )
}

const SkillsBlock = ({skills}:SkillsProps) => {

  return (
    <section className={ styles.skills }>
      <h2 className={styles.sectionHed}>Skills</h2>
      
      <ul>
      
        { skills.map(skill => {
          const skillStyle = `${(skill.score / 10) * 100}%`

          return (
            <li key={skill.name}>
              <div className={styles.skillWrapper} title={`${skill.name}: ${skill.score} / 10`}>
                <h3 className={ styles.skillTitle}>{skill.name}</h3>
                <span className={ styles.skillRating } data-rating={skill.score}>
                  <span className={styles.skillRatingText }>{skill.score} / 10</span>
                  <span className={ styles.skillRatingGraph }>
                    <i style={{ width: skillStyle }}></i>
                  </span>
                </span>
              </div>
            </li>
  
          )

        })}
       
      </ul>
    </section>
  )
}

const ExperienceBlock = ({experience}:ExperienceProps) => {
  return (
    <section className={ styles.experience }>
      <h2 className={styles.sectionHed}>Experience</h2>
      <ul>
        { experience.map(job => {
          const years = job.years.length == 1 ? job.years[0] : `${job.years[0]}–${job.years[1]}`
          return (
            <li key={job.title}>
              <h3 className={ styles.itemHead }>{ job.title }; { years }</h3>
              <div className={ styles.jobSkills }>
                <div className={ styles.jobSkillsGraph }>
                  <span className={ styles.jobSkillsGraphBar } style={{width: '100%;'}}></span>
                </div>
                <ul className={ styles.jobSkillsItems }>
                  { job.skills.map(skill => {
                    return (
                      <li key={skill.name} className={ styles.jobSkill } data-value={skill.score} title={`${skill.name} approximately ${skill.score}%`} style={{width: `${skill.score}%`}}>
                        <span className={ styles.jobSkillInner }>
                          <Devicon name={skill.name} />
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className={ styles.jobDescription }>
                  <ul>
                    { job.description.map(line => {
                      return (
                        <li key={line}>{ line }</li>
                      )
                    })}
                  </ul>
                </div>                  
            </li>            
          )

        })}
        
      </ul>
    </section>
  )
}

const SamplesBlock = ({workSamples}:SampleProps) => {
  return (
    <section className={ styles.samples }>
      <h2 className={styles.sectionHed}>Work Samples</h2>
      <ul>
        { workSamples.map(sample => {
          return (
            <li key={sample.title}>
              <h3 className={ styles.itemHead }>
                <Link href={ sample.url } target="_blank" rel="noreferrer">{ sample.title }</Link>, { sample.year }
              </h3>
              <ul className={ styles.jobTech }>
                { sample.tech.map(tech => {
                  return (
                    <li key={tech}>
                      <Devicon name={tech} />
                    </li>
                  )
              })}
              </ul>
              <div className="job-description">
                <p>{ sample.description }</p>
              </div>
            </li>
            )
        })}

      </ul>
    </section>    
  )
}

const Resume:FC<ResumeProps> = ( {resumeData} ) => {
  return (
    <div>
      <Head>
        <title>Resume | Hypertext Jockey</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={ styles.container }>
        <ContactBlock contact={resumeData.contact} />
        <ProfileBlock profile={resumeData.profile} />
        <SkillsBlock skills={resumeData.skills} />
        <ExperienceBlock experience={resumeData.experience} />
        <SamplesBlock workSamples={resumeData.workSamples} />
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const resumeData = getResumeData("static");
  return {
    props: { resumeData }
  };
};

export default Resume

