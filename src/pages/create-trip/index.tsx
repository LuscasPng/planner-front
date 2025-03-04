import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";

export function CreateTrip() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState(['']);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }
  
  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }
  
  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmModal() {
    setIsConfirmModalOpen(true);
  }

  function closeConfirmModal() {
    setIsConfirmModalOpen(false);
  }  

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString(); 

    if(!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailToInvite(emailToRemove: string) {
    setEmailsToInvite(emailsToInvite.filter(email => email !== emailToRemove)); 
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate('/trips/1'); 
  }
  
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center">
          <img src="/Logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep 
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
          />

          {isGuestsInputOpen ? (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openConfirmModal={openConfirmModal}
              openGuestsModal={openGuestsModal}
            />
          ) : null}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>

      {/* Aqui eu utilizei ternario com && que tira a necessidade de usar o else */}
      {isGuestsModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          removeEmailToInvite={removeEmailToInvite}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmTripModal 
          closeConfirmModal={closeConfirmModal}
          createTrip={createTrip}
        />
      )}

    </div>
  )
}
