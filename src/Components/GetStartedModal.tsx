import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface GetStartedModalProps {
    onClose: () => void;
}

const GetStartedModal: React.FC<GetStartedModalProps> = ({ onClose }) => {
    const [step, setStep] = useState(0);

    const slides = [
        { title: "Welcome to DebtSolver", content: "Let's go over some quick tips to get you started.", image: ""},
        { title: "Using the Dashboard", content: "The dashboard let's you view all debts.", image: "" },
        { title: "Creating new Debts", content: "Click New Debt to add a new Card or Bank Loan.", image: "" },
        { title: "You're All Set!", content: "Get started!" }
    ];

    const nextStep = () => {
        if (step < slides.length - 1) {
            setStep(step + 1);
        } else {
            onClose(); // Call the function to close modal
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{slides[step].title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <img 
                    src={slides[step].image} 
                    alt={slides[step].title} 
                    className="img-fluid rounded mb-3"
                />
                <p>{slides[step].content}</p>
            </Modal.Body>
            <Modal.Footer>
                {step > 0 && (
                    <Button variant="secondary" onClick={prevStep}>
                        Back
                    </Button>
                )}
                <Button variant="primary" onClick={nextStep}>
                    {step < slides.length - 1 ? "Next" : "Finish"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GetStartedModal;
