import { useState, useCallback } from "react";

// Кастомный хук для открытия/закрытия попапа
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  
  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
