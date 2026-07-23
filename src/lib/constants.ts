export const SITE = {
  name: "Flipper Zero",
  tagline: "Your Ultimate Portable Multi-Tool",
  description:
    "An open-source portable multi-tool for pentesters, hardware explorers, and security researchers. Sub-GHz, NFC, RFID, IR, GPIO, and more — in your pocket.",
  url: "https://flipperzero.one",
  buyUrl: "https://shop.flipperzero.one/",
} as const;

export const HARDWARE_FEATURES = [
  {
    id: "display",
    title: "1.4\" LCD",
    description: "Monochrome 128×64 display with custom UI and dolphin companion.",
    angle: [0.12, 0.35, 0.08] as [number, number, number],
    anchor: [0, 0.18, 0.32] as [number, number, number],
    labelPos: [-1.15, 0.45, 0.2] as [number, number, number],
    side: "left" as const,
  },
  {
    id: "gpio",
    title: "GPIO",
    description: "18-pin GPIO for sensors, modules, and hardware experiments.",
    angle: [0.08, -0.95, 0] as [number, number, number],
    anchor: [0.85, 0.02, 0.05] as [number, number, number],
    labelPos: [1.2, 0.12, 0.05] as [number, number, number],
    side: "right" as const,
  },
  {
    id: "subghz",
    title: "Sub-GHz",
    description: "433 / 868 / 915 MHz transceiver for RF research and analysis.",
    angle: [-0.15, 0.7, 0] as [number, number, number],
    anchor: [-0.55, 0.15, 0.15] as [number, number, number],
    labelPos: [-1.2, 0.3, 0.1] as [number, number, number],
    side: "left" as const,
  },
  {
    id: "nfc",
    title: "NFC",
    description: "13.56 MHz NFC reader/emulator for proximity experiments.",
    angle: [0.35, -0.25, 0] as [number, number, number],
    anchor: [0, -0.05, 0.28] as [number, number, number],
    labelPos: [1.2, -0.02, 0.15] as [number, number, number],
    side: "right" as const,
  },
  {
    id: "bluetooth",
    title: "Bluetooth",
    description: "BLE for mobile companion apps and wireless workflows.",
    angle: [0.05, 1.15, 0] as [number, number, number],
    anchor: [0.15, 0.28, -0.15] as [number, number, number],
    labelPos: [-1.15, 0.5, 0] as [number, number, number],
    side: "left" as const,
  },
  {
    id: "infrared",
    title: "Infrared",
    description: "IR transceiver to study and control consumer remotes.",
    angle: [0.18, 0.95, 0] as [number, number, number],
    anchor: [-0.75, 0.08, 0.08] as [number, number, number],
    labelPos: [-1.25, 0.08, 0.08] as [number, number, number],
    side: "left" as const,
  },
  {
    id: "rfid",
    title: "RFID",
    description: "125 kHz low-frequency RFID for access control research.",
    angle: [-0.12, -0.55, 0] as [number, number, number],
    anchor: [0.25, -0.15, 0.22] as [number, number, number],
    labelPos: [1.2, -0.2, 0.12] as [number, number, number],
    side: "right" as const,
  },
  {
    id: "microsd",
    title: "MicroSD",
    description: "Expandable storage for firmware, dumps, and apps.",
    angle: [0.35, 1.35, 0] as [number, number, number],
    anchor: [0.45, -0.28, 0] as [number, number, number],
    labelPos: [1.25, -0.4, 0] as [number, number, number],
    side: "right" as const,
  },
  {
    id: "usbc",
    title: "USB-C",
    description: "Charge, debug, and flash — modern connectivity.",
    angle: [0.55, 0.05, 0] as [number, number, number],
    anchor: [0, -0.5, 0.05] as [number, number, number],
    labelPos: [-1.15, -0.55, 0.05] as [number, number, number],
    side: "left" as const,
  },
] as const;

export const FEATURE_CARDS = [
  {
    title: "Wireless",
    description: "Sub-GHz, NFC, RFID, Bluetooth, and Infrared in one pocket device.",
    icon: "Radio",
  },
  {
    title: "Hardware",
    description: "GPIO, iButton, and expansion modules for hands-on prototyping.",
    icon: "Cpu",
  },
  {
    title: "Connectivity",
    description: "USB-C for power, serial, and seamless host integration.",
    icon: "Usb",
  },
  {
    title: "Storage",
    description: "MicroSD support for apps, captures, and custom assets.",
    icon: "HardDrive",
  },
  {
    title: "Open Source",
    description: "Firmware, hardware designs, and a thriving community.",
    icon: "GitBranch",
  },
  {
    title: "Battery",
    description: "All-day research sessions with efficient power management.",
    icon: "BatteryCharging",
  },
  {
    title: "Security Research",
    description: "Built for ethical testing, education, and exploration.",
    icon: "Shield",
  },
  {
    title: "Developer Friendly",
    description: "Apps, plugins, and SDKs for extending every capability.",
    icon: "Code2",
  },
] as const;

export const TIMELINE = [
  {
    title: "Idea",
    description: "A pocket lab for radios, badges, and curiosity.",
  },
  {
    title: "Prototype",
    description: "First boards, first dolphin, first late nights.",
  },
  {
    title: "Development",
    description: "Firmware, RF stacks, and a custom UI take shape.",
  },
  {
    title: "Launch",
    description: "Crowdfunding success and a global waitlist.",
  },
  {
    title: "Community",
    description: "Thousands of builders shipping apps and plugins.",
  },
  {
    title: "Open Source",
    description: "Transparent hardware and firmware for everyone.",
  },
] as const;

export const SPECS = [
  { label: "MCU", value: "STM32WB55", numeric: null, suffix: "" },
  { label: "Battery", value: "LiPo", numeric: 2000, suffix: "mAh+" },
  { label: "Display", value: "128×64 LCD", numeric: 1.4, suffix: '"' },
  { label: "GPIO", value: "Expansion", numeric: 18, suffix: " pins" },
  { label: "Storage", value: "MicroSD", numeric: null, suffix: "" },
  { label: "Bluetooth", value: "BLE 5.0", numeric: 5, suffix: ".0" },
  { label: "Dimensions", value: "100×40×25", numeric: 100, suffix: "mm" },
  { label: "Weight", value: "Compact", numeric: 67, suffix: "g" },
  { label: "Protocols", value: "Multi-radio", numeric: 5, suffix: "+" },
] as const;

export const COMMUNITY_STATS = [
  { label: "Developers", value: 15000, suffix: "+" },
  { label: "GitHub Activity", value: 2.4, suffix: "M+" },
  { label: "Ecosystem Apps", value: 800, suffix: "+" },
  { label: "Open Source", value: 100, suffix: "%" },
] as const;

export const EXPLODED_PARTS = [
  {
    id: "display",
    label: "Display",
    anchor: [0, 0.55, 0.15] as [number, number, number],
    labelPos: [-1.25, 0.85, 0.15] as [number, number, number],
    side: "left" as const,
  },
  {
    id: "case-top",
    label: "Top Case",
    anchor: [0.15, 0.28, 0] as [number, number, number],
    labelPos: [1.3, 0.45, 0] as [number, number, number],
    side: "right" as const,
  },
  {
    id: "pcb",
    label: "Mainboard",
    anchor: [0, 0.02, 0.05] as [number, number, number],
    labelPos: [-1.3, 0.05, 0.05] as [number, number, number],
    side: "left" as const,
  },
  {
    id: "battery",
    label: "Battery",
    anchor: [0, -0.32, -0.05] as [number, number, number],
    labelPos: [1.3, -0.3, 0] as [number, number, number],
    side: "right" as const,
  },
  {
    id: "buttons",
    label: "Controls",
    anchor: [0.42, 0.05, 0.22] as [number, number, number],
    labelPos: [1.35, 0.12, 0.15] as [number, number, number],
    side: "right" as const,
  },
  {
    id: "case-bottom",
    label: "Bottom Case",
    anchor: [0, -0.52, 0] as [number, number, number],
    labelPos: [-1.25, -0.7, 0] as [number, number, number],
    side: "left" as const,
  },
] as const;
