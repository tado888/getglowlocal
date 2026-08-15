import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { X } from "lucide-react";

const FORM_ID = "lbUkQzatX4dixQ5xFQnL";

const GhlPopupContext = createContext<() => void>(() => {});

export function useGhlPopup() {
  return useContext(GhlPopupContext);
}

export function GhlPopupProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openPopup = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <GhlPopupContext.Provider value={openPopup}>
      {children}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Get Glow Local Form"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close form"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-background/90 p-2 text-foreground shadow"
            >
              <X className="size-5" />
            </button>
            <iframe
              src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "8px",
              }}
              id={`popup-${FORM_ID}`}
              data-layout="{'id':'POPUP'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Get Glow Local Form"
              data-height="1256"
              data-layout-iframe-id={`popup-${FORM_ID}`}
              data-form-id={FORM_ID}
              title="Get Glow Local Form"
              data-modal-height="500"
            />
          </div>
        </div>
      )}
    </GhlPopupContext.Provider>
  );
}
