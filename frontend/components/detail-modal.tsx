import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Tabs, Tab } from "@heroui/tabs";
import { Chip } from "@heroui/chip";

import { SalesRep } from "@/interfaces/sales";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  salesRep?: SalesRep | null;
};
export default function DetailModal({
  isOpen,
  onClose,
  onOpenChange,
  salesRep,
}: Props) {
  if (!salesRep) return null;

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      size="xl"
      onClose={onClose}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="h-[500px] flex flex-col">
        <ModalHeader className="flex flex-col">
          <div className="font-bold text-xl">{salesRep.name}</div>
          <div className="font-normal text-sm text-default-400">
            {salesRep.role} | {salesRep.region}
          </div>
        </ModalHeader>
        <ModalBody>
          <Tabs>
            <Tab title="Deals">
              <div className="flex flex-col gap-4">
                {salesRep.deals.map((deal) => (
                  <div
                    key={deal.client}
                    className="border border-default-100 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="font-bold">{deal.client}</h1>
                        <h2>${deal.value}</h2>
                      </div>
                      <div className="flex flex-col">
                        <Chip
                          color={
                            deal.status == "Closed Won"
                              ? "success"
                              : deal.status == "Closed Lost"
                                ? "danger"
                                : "default"
                          }
                        >
                          {deal.status}
                        </Chip>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tab>
            <Tab title="Clients">
              <div className="flex flex-col gap-4">
                {salesRep.clients.map((client) => (
                  <div
                    key={client.name}
                    className="border border-default-100 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="font-bold">{client.name}</h1>
                        <h2 className="text-sm text-default-400">{client.contact}</h2>
                      </div>
                      <div className="flex flex-col">
                        <Chip color="default">{client.industry}</Chip>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tab>
            <Tab title="Skills">
              <div className="flex gap-4">
                {salesRep.skills.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </Tab>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
