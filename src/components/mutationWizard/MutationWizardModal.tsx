import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import MutationStepCreate from "./MutationStepCreate";
import MutationStepDelete from "./MutationStepDelete";
import MutationStepCreateTemplate from "./MutationStepCreateTemplate";
import { useTenantContext } from "../TenantContext";

const steps = [
  { title: "Create Template", component: MutationStepCreateTemplate },
  { title: "Create Item", component: MutationStepCreate },
  { title: "Delete Item", component: MutationStepDelete },
];
function MutationWizardModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(0);
  const { selectedTenant } = useTenantContext();

  const StepComponent = steps[step].component;

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));
  const handleClose = () => {
    setStep(0);
    onClose();
  };

  return (
    <>
      <Box mb={4} px={2} color="gray.600" fontSize="sm">
        This wizard demonstrates how to use <b>createTemplate</b>,{" "}
        <b>createItem</b>, and <b>deleteItem</b> mutations with the Sitecore
        Marketplace SDK.
        <br />
        For further mutation examples, visit the{" "}
        <a
          href="https://doc.sitecore.com/xmc/en/developers/xm-cloud/query-examples-for-authoring-operations.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#3182ce", textDecoration: "underline" }}
        >
          official Sitecore documentation
        </a>
        .
      </Box>
      <Box display="flex" justifyContent="center" mb={4}>
        <Button colorScheme="blue" onClick={onOpen} isDisabled={!selectedTenant}>
          Open Mutation Wizard
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{steps[step].title}</ModalHeader>

          <ModalBody>
            {!selectedTenant ? (
              <Box color="orange.500" p={4}>
                Please select a tenant to continue.
              </Box>
            ) : (
              <StepComponent />
            )}
          </ModalBody>
          <ModalFooter>
            <Box flex="1" />
            <Button
              mr={3}
              onClick={handlePrev}
              isDisabled={step === 0 || !selectedTenant}
            >
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button
                colorScheme="blue"
                onClick={handleNext}
                isDisabled={!selectedTenant}
              >
                Next
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={handleClose}>
                Finish
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MutationWizardModal;
