import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { supabase } from "@/integrations/supabase/client";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  in_stock: boolean;
};

function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function openWhatsAppOrder(product: Product) {
  const message = `Hello! 👋

I would like to order:

📦 Product: ${product.name}
💰 Price: ₹${product.price.toFixed(2)}

Please share the next steps for payment & delivery. Thank you!`;

  // Fire-and-forget log (does not block redirect)
  supabase
    .from("orders_log")
    .insert({
      product_id: product.id,
      product_name: product.name,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    })
    .then(({ error }) => {
      if (error) console.error("Failed to log inquiry", error);
    });

  const cleanPhone = WHATSAPP_NUMBER.replace(/\s|\+|-/g, "");
  const encoded = encodeURIComponent(message);
  const appUrl = `whatsapp://send?phone=${cleanPhone}&text=${encoded}`;
  const fallbackUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;

  let didLeavePage = false;

  const markLeftPage = () => {
    didLeavePage = true;
  };

  window.addEventListener("blur", markLeftPage, { once: true });
  window.addEventListener("pagehide", markLeftPage, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      didLeavePage = true;
    }
  }, { once: true });

  // Open the installed WhatsApp app first.
  // If the browser stays on this page, fall back to a normal WhatsApp link.
  window.location.assign(appUrl);

  window.setTimeout(() => {
    if (!didLeavePage && !document.hidden) {
      window.location.assign(fallbackUrl);
    }
  }, 2500);
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-sm bg-ivory/5">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="product-card-img h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ivory/30">
            No image
          </div>
        )}
        {!product.in_stock && (
          <span className="absolute left-3 top-3 rounded-sm bg-charcoal/80 px-2 py-1 text-[10px] uppercase tracking-widest text-ivory">
            Sold out
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="font-serif text-lg text-ivory">{product.name}</h3>
        {product.description && (
          <p className="mt-1 line-clamp-2 text-sm text-ivory/60">{product.description}</p>
        )}
        <div className="mt-3 flex items-baseline justify-between">
          <span className="gold-text font-serif text-xl">
            ₹{product.price.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => openWhatsAppOrder(product)}
          disabled={!product.in_stock}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-5 py-3 text-xs font-medium uppercase tracking-widest text-charcoal transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <MessageCircle className="h-4 w-4" />
          Order on WhatsApp
        </button>
      </div>
    </article>
  );
}
