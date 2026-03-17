import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { scanContent } from "../store/userApi";
import PiiWarningModal from "../components/PiiWarningModal";

/**
 * Hook to scan form content for PII before saving.
 * Returns { scanAndSave, PiiModal }.
 *
 * Usage:
 *   const { scanAndSave, PiiModal } = usePiiScanBeforeSave();
 *   const handleSave = async () => {
 *     await scanAndSave(
 *       [form.description, form.bio, form.notes].filter(Boolean),
 *       async () => {
 *         await dispatch(updateProfile(form));
 *         toast.success("Saved");
 *       }
 *     );
 *   };
 */
export function usePiiScanBeforeSave() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingWarnings, setPendingWarnings] = useState([]);
  const [pendingProceed, setPendingProceed] = useState(null);

  const scanAndSave = useCallback(
    async (fields, onProceed) => {
      const texts = Array.isArray(fields)
        ? fields.filter(Boolean)
        : typeof fields === "object"
        ? Object.values(fields).filter((v) => v && typeof v === "string")
        : [];
      if (texts.length === 0) {
        onProceed?.();
        return;
      }
      const result = await dispatch(scanContent({ fields: texts }));
      if (scanContent.rejected.match(result)) {
        onProceed?.();
        return;
      }
      const { safe, warnings } = result.payload || {};
      if (safe || !warnings?.length) {
        onProceed?.();
        return;
      }
      setPendingWarnings(warnings);
      setPendingProceed(() => onProceed);
      setModalOpen(true);
    },
    [dispatch]
  );

  const handleConfirm = () => {
    pendingProceed?.();
    setPendingProceed(null);
    setModalOpen(false);
    setPendingWarnings([]);
  };

  const handleCancel = () => {
    setPendingProceed(null);
    setModalOpen(false);
    setPendingWarnings([]);
  };

  const PiiModal = React.createElement(PiiWarningModal, {
    open: modalOpen,
    warnings: pendingWarnings,
    onConfirm: handleConfirm,
    onCancel: handleCancel,
  });

  return { scanAndSave, PiiModal };
}
