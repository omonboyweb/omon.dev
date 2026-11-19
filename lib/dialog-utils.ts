export const OPEN_RECRUITER_SUMMARY_EVENT = "omon:open-recruiter-summary";

export function safeShowModal(dialog: HTMLDialogElement | null): void {
  if (!dialog || !dialog.isConnected || dialog.open) return;
  try {
    dialog.showModal();
  } catch {
    // Guard against InvalidStateError if dialog state raced with navigation/unmount
  }
}

export function safeCloseDialog(dialog: HTMLDialogElement | null): void {
  if (!dialog || !dialog.open) return;
  try {
    dialog.close();
  } catch {
    // Ignore close errors on detached dialogs
  }
}

export function attachDialogClosedByFallback(
  dialog: HTMLDialogElement | null,
): (() => void) | undefined {
  if (
    !dialog ||
    typeof HTMLDialogElement === "undefined" ||
    "closedBy" in HTMLDialogElement.prototype
  ) {
    return undefined;
  }

  const isOutside = (e: PointerEvent) => {
    const r = dialog.getBoundingClientRect();
    return (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    );
  };

  let pressedOutside = false;
  const onPointerDown = (e: PointerEvent) => {
    pressedOutside = isOutside(e);
  };
  const onPointerUp = (e: PointerEvent) => {
    if (pressedOutside && isOutside(e)) {
      safeCloseDialog(dialog);
    }
    pressedOutside = false;
  };

  dialog.addEventListener("pointerdown", onPointerDown);
  dialog.addEventListener("pointerup", onPointerUp);

  return () => {
    dialog.removeEventListener("pointerdown", onPointerDown);
    dialog.removeEventListener("pointerup", onPointerUp);
  };
}
