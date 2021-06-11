import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import layout from "../../styles/components/Layout.module.scss";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import ReactMarkdown from "react-markdown";

export default function MScTrackOverview({ content }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />

      <main className={layout.container__main}>
        <h1>{content.title}</h1>
        <ReactMarkdown>{content.description}</ReactMarkdown>
        {content.thesisProjectsCollection.items.map((project) => (
          <section>
            <h2 key={project.title}>{project.title}</h2>
            <p>{project.description}</p>
            <h3>Team Members</h3>
            <ul>
              {project.teamCollection.items.map((teamMember) => (
                <li key={teamMember.fullName}>{teamMember.fullName}</li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </Layout>
  );
}
{
  /* Contact

Camila Correa and Shin’ichiro Ando
Galactic clues to the nature of dark matter

Understanding the nature of dark matter (DM) has become one of the most pressing questions in modern physics and cosmology. Evidence for its existence is exclusively based on its gravitational interactions, as we still know very little about its particle properties. Recent studies are investigating the possibility that DM particles experience collisions against each other. The rate of such collisions can be constrained from observed galaxy density profiles, spanning from dwarf galaxy scales (e.g. Correa 2020) to cluster scales (e.g. Sagunski et al. 2020). However, a theoretical model for the DM particle interactions, that connects the recent observational estimations at various galaxy scales, is still missing. The goals of this research project are to derive such model arguing that DM exists in a ‘hidden sector’, where forces between DM particles are mediated by analogues to electroweak or strong forces. The following steps will be to implement the model in a numerical simulation of galaxy formation, produce simulation runs using the supercomputer cartesius, and investigate observational signatures of self-interacting DM.
Numerical simulations have become an almost indispensable tool in astrophysical research. By carrying out this project, the student will learn about cosmological simulations of galaxy formation, parallelisation and high-performance computing. The student will also connect particle physics modelling with cosmology while building a solid understanding of structure formation.
References

    Correa (2020) https://arxiv.org/abs/2007.02958
    Sagunksi et al. (2020) https://arxiv.org/abs/2006.12515

Contact

Camila Correa and Shin’ichiro Ando
Higher order statistics of the gamma-ray data

In recent years, discussions on statistical properties of the all-sky gamma-ray data have been found very efficient to constrain properties of astrophysical sources and dark matter that can contribute to the gamma-ray background. Thus far, however, people argued only up to a second-order moment, i.e., variance or the angular power spectrum, of the distribution of the photon counts. There is however no need to stop there, and therefore, it is natural to question what extra information the next third-order moment, skewness, would bring on top of what has been achieved. Maybe using the skewness or the angular bi-spectrum will be essential in revealing the nature of particle dark matter still hidden in the existing data. Master student will explore this.
Contact

Shin’ichiro Ando
Understanding the high energy emission mechanisms in globular clusters of the Milky Way

With the increased sensitivity of gamma-ray detectors such as Fermi-LAT the number of presently known gamma-ray globular clusters has grown by a factor of ~2 in the last year. The new detections are beginning to provide clues about the origin of the high-energy radiation in the form of emerging patterns and correlations among observed quantities such as gamma-ray luminosity, stellar mass and interstellar radiation energy density. But there are still many questions about the mechanisms of emission and intracluster environmental properties. This project will re-examine these emerging patterns and correlations by carefully studying the population of currently undetected globular clusters.
Contact

Shin’ichiro Ando
A realistic assessment of CTA sensitivities to dark matter and millisecond pulsars in the Andromeda Galaxy

Future gamma-ray telescopes such as CTA will allow comparative studies of cosmic rays (CRs) and high-energy objects in the Milky Way (MW) and in other, external galaxies such as Andromeda. Measurements with the Fermi-LAT telescope revealed that the flux from Andromeda is confined to the inner regions of the galaxy and does not fill its galactic disk or extend far from it. The gamma-ray signal is not correlated with regions rich in gas or star-formation activity suggesting that the emission is not interstellar in origin. Alternative and nonexclusive interpretations are that the emission results from a population of millisecond pulsars dispersed in the bulge and disk of Andromeda by disrupted globular clusters or from the decay or annihilation of dark matter particles. This project will estimate the sensitivity of the upcoming CTA gamma-ray telescope to DM annihilation and MSPs at the Andromeda Galaxy. We will introduce a statistical framework for including systematic errors and estimate the consequent degradation in sensitivity. The morphology of the signal at very high energies might allow to distinguish the DM from MSPs hypothesis in the Andromeda galaxy.
Contact

Shin’ichiro Ando
Searching for dark matter with gravitational waves

The discovery of gravitational waves has opened new exciting opportunities for fundamental physics. One of the most intriguing aspects of this new “window in the universe” is the possibility to study in unprecedented detail the environment around black holes, and a team of GRAPPA researchers has recently shown that these observations can set extraordinarily stringent constraints on the mysterious dark matter that appears to permeate the universe at all scales. In this project we will explore the interplay between gravitational waves, black holes and dark matter. We will focus in particular on the possibility to probe the fundamental nature of dark matter by looking at how it clusters around black holes, and on its subtle impact on the gravitational waveform produced in the merger of black hole binaries. The project will involve both analytical and numerical work, and will be conducted under supervision of G. Bertone, and in collaboration with other GRAPPA staff and postdocs.
Contact

Gianfranco Bertone
The Hubble Tension

One of the fundamental cosmological parameters is the Hubble constant, which is related to the age of the universe. A way to determine the Hubble constant is to measure the expansion rate of the universe using supernova explosions. Unfortunately, these measurements don’t quite agree with the value of the Hubble constant inferred from the cosmic microwave background. To reconcile these measurements might require a change of the standard model of cosmology.

In this thesis, you will first study the observations that led to the Hubble tension and then explore possible resolutions due to new physics.
References

1907.10625, 1908.03663 https://www.quantamagazine.org/cosmologists-debate-how-fast-the-universe-is-expanding-20190808/
Contact

Daniel Baumann
Gravitational lensing image analysis with deep probabilistic programming

Recent breakthroughs in machine learning, in particular deep learning, have a profound impact on how data analysis and modeling in many scientific areas are done. In particular, deep probabilistic programming techniques allow to combine the universal power of deep neural networks with specific scientific predictions derived from first principles.

The nature of dark matter, which constitutes more than 80% of the mass in the Universe, remains unknown. Gravitationally lensed images of distant quasars and galaxies allow us to study the dark matter distribution in the Universe at small scales. This delivers important information about various particle physics models for dark matter.

In this project, the student will first learn advanced deep learning analysis tools (probabilistic programming, geometric deep learning, contrastive learning), as well as the physics of gravitationally lensed images. The student will then explore various ways to improve the sensitivity of current machine-learning based analysis pipelines towards dark matter substructure.
Contact

Christoph Weniger
Projects on multimessenger signatures of supernovae and compact object mergers

Masters student projects are available in the GRAPPA multimessenger astrophysics group led Samaya Nissanke and Philipp Moesta. Projects can involve modelling compact object mergers and supernovae via numerical simulations, analyzing and using simulation outputs to build (semi-)analytic models to capture the physics of these systems, and using simulation outputs and models to connect and compare to available gravitational-wave and electromagnetic observational data. Projects can develop a large variety of skills and expertise including high-performance computing, data analysis, and machine learning.
Contact

Philipp Moesta and Samaya Nissanke
XENON1T Data Analysis

The XENON collaboration has used the XENON1T detector to achieve the world’s most sensitive direct detection dark matter results and is currently building the XENONnT successor experiment. The detectors operate at the Gran Sasso underground laboratory and consist of so-called dual-phase xenon time-projection chambers filled with ultra-pure xenon. Our group has an opening for a motivated MSc student to do analysis with the data from the XENON1T detector. The work will consist of understanding the detector signals and applying machine learning tools such as deep neutral networks to improve the reconstruction performance in our Python-based analysis tool, following the approach described in arXiv:1804.09641. The final goal is to improve the energy and position reconstruction uncertainties for the dark matter search. There will also be opportunity to do data-taking shifts at the Gran Sasso underground laboratory in Italy.
Contact

Patrick Decowski */
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query mScThesisProjects {
        mScThesisProjects(id: "144HbgnCQuU6XINC4aH2FW") {
          sys {
            id
          }
          title
          description
          thesisProjectsCollection {
            items {
              title
              description
              teamCollection {
                items {
                  fullName
                }
              }
            }
          }
        }
      }
    `,
  });

  console.log(data);

  return {
    props: {
      content: data.mScThesisProjects,
    },
  };
}
