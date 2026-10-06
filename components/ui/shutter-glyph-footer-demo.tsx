"use client"

import React from "react"
import ShutterGlyphFooter from "@/components/ui/shutter-glyph-footer"

export default function DemoShutterGlyphFooter() {
  return (
    <div className="w-full bg-[#111110]">
      <ShutterGlyphFooter
        brand="Verso"
        company="Verso Type & Print"
        since={2017}
        background="#111110"
        ink="#efe9dc"
        signupLabel="Monthly letters from the print room"
        placeholder="Your email"
        socials={[
          { label: "Are.na", href: "#" },
          { label: "Instagram", href: "#" },
          { label: "Bandcamp", href: "#" },
        ]}
        legal={[
          { label: "Imprint", href: "#" },
          { label: "Privacy", href: "#" },
        ]}
        onSubscribe={async (email) => {
          await new Promise((r) => setTimeout(r, 900))
          return !email.startsWith("fail@")
        }}
        onLinkClick={(label) => console.log("footer link:", label)}
      />
    </div>
  )
}
