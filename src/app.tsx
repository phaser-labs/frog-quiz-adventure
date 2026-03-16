

import { useEffect, useState } from 'react';
import { Audio, Col, Modal, Row } from 'books-ui';

import "books-ui/styles";

import FrogJumping from './game-jump-frog/FrogJumping';


const MODALS = {
  SUCCESS: 'modal-correct-activity',
  WRONG: 'modal-wrong-activity'
};
interface DataGameFrog {
  id: number;
  question: string;
  options: {
    id: string;
    label: string;
    state: 'wrong' | 'success';
  }[];
}
const dataGameFrog: DataGameFrog[] = [
  {
    id: 1,
    question: '¿Cuál es el objetivo principal del análisis de actores clave en un proyecto rural?',
    options: [
      {
        id: '1-1',
        label: 'Determinar el presupuesto del proyecto.',
        state: 'wrong'
      },
      {
        id: '1-2',
        label: 'Identificar a las partes interesadas que impactan el proyecto.',
        state: 'success'
      },
      {
        id: '1-3',
        label: 'Fijar los plazos de ejecución.',
        state: 'wrong'
      }
    ]
  },
  {
    id: 2,
    question: '¿Qué busca el análisis de la problemática en un proyecto rural?',
    options: [
      {
        id: '2-1',
        label: 'Examinar los problemas, sus causas y sus consecuencias en la comunidad.',
        state: 'success'
      },
      {
        id: '2-2',
        label: 'Establecer el presupuesto para solucionar los problemas.',
        state: 'wrong'
      },
      {
        id: '2-3',
        label: 'Identificar las oportunidades de crecimiento económico en la comunidad.',
        state: 'wrong'
      }
    ]
  },
  {
    id: 3,
    question: '¿Qué se busca lograr con el análisis de objetivos en un proyecto rural?',
    options: [
      {
        id: '3-1',
        label: 'Definir las metas y fines del proyecto.',
        state: 'success'
      },
      {
        id: '3-2',
        label: 'Establecer el presupuesto para las actividades del proyecto.',
        state: 'wrong'
      },
      {
        id: '3-3',
        label: 'Identificar los actores clave involucrados en el proyecto.',
        state: 'wrong'
      }
    ]
  },
  {
    id: 4,
    question: '¿Qué se muestra en el árbol de problemas?',
    options: [
      {
        id: '4-1',
        label: 'El problema central, sus causas y sus efectos.',
        state: 'wrong'
      },
      {
        id: '4-2',
        label: 'Las soluciones propuestas para el problema.',
        state: 'success'
      },
      {
        id: '4-3',
        label: 'Los medios y fines.',
        state: 'wrong'
      }
    ]
  }
];
function App() {
    const [isOpen, setIsOpen] = useState<string | null>(null);
  const [currentQuestion, setcurrentQuestion] = useState(1);
  // const [result, setResult] = useState<boolean | null>(null);
  useEffect(() => {
    const handleCurrentQuestion = (event: Event) => {
      const customEvent = event as CustomEvent;
      setcurrentQuestion(customEvent.detail);

      // Puedes actualizar estados, puntaje, mostrar feedback, etc.
    };
    const handleCurrentResult = (event: Event) => {
      const customEvent = event as CustomEvent;
      handleOpenModal(customEvent.detail);
      // setResult();
    };
    window.addEventListener('informationQuestion', handleCurrentQuestion);
    window.addEventListener('informationResult', handleCurrentResult);

    return () => {
      window.removeEventListener('informationQuestion', handleCurrentQuestion);
      window.removeEventListener('informationResult', handleCurrentResult);
    };
  });

  // Controlamos los modales de la actividad.

  /**
   * Función que se encarga de validar
   * el valor proporcionado por Selects.
   * @param {object[]} result
   */
  const handleOpenModal = (result?: boolean) => {
    setTimeout(() => {
      const activityResult = result === true ? `SUCCESS` : result === false ? `WRONG` : null;
      setIsOpen(MODALS[activityResult as keyof typeof MODALS]);
    }, 3500);
  };

  const closeModal = () => {
    setIsOpen(null);
    // const containerMainScene = document.querySelector('.container') as HTMLElement;
    // console.log(containerMainScene);
    // containerMainScene.setAttribute('tabindex', '0');
    // containerMainScene.focus();
  };



  return (
     <>
      <div
      //este esl codigo que se le pasa por props a panel.section o content
        // interpreter={{
        //   a11yURL: `vid_int_des_ova-26_sld-17_${currentQuestion}.mp4`,
        //   contentURL: `vid_int_ova-26_sld-17_${currentQuestion}.mp4`
        // }}
        >
        <Audio key={currentQuestion} a11y src={`assets/audios/ally/aud_des_ova-26_sld-17__${currentQuestion}.mp3`} />
        <Row justifyContent="center" alignItems="center">
          <Col xs="12" hd="8">
            <Audio
              addClass="u-mb-2"
              key={currentQuestion}
              src={`assets/audios/aud_ova-26_sld-17_${currentQuestion}.mp3`}
            />
            <FrogJumping dataGameFrog={dataGameFrog} onResult={(result) => console.log(result)}></FrogJumping>
          </Col>
        </Row>
      </div>
      <Modal isOpen={MODALS.SUCCESS === isOpen} onClose={closeModal} finalFocusRef={'.gameMaze__question'}>
        <Modal.Overlay />
        <Modal.Content addClass="feedbackModal">
          <Modal.CloseButton />
          <div className="feedbackModalContent">
            <h2  className='titulo_modal_correcto'>¡Correcto!</h2>
            <p >Felicitaciones, la respuesta es correcta.</p>
          </div>
        </Modal.Content>
      </Modal>

      <Modal isOpen={MODALS.WRONG === isOpen} onClose={closeModal} finalFocusRef={'.gameMaze__question'}>
        <Modal.Overlay />
        <Modal.Content addClass="feedbackModal">
          <Modal.CloseButton />
          <div className="feedbackModalContent">
            <h2  className='titulo_modal_incorrecto'>¡Incorrecto!</h2>
             <p>Vuelve a intentarlo, lo puedes lograr.</p>
          </div>
        </Modal.Content>
      </Modal>

    </>
  );
}

export default App;
