<!-- Design System -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Roundtable OS - Dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-container": "#c7abff",
                    "on-error-container": "#68001f",
                    "surface-tint": "#5148d8",
                    "surface-container": "#eaeef1",
                    "on-secondary-fixed": "#004e47",
                    "primary-fixed-dim": "#aeabff",
                    "primary-container": "#bdbaff",
                    "surface": "#f7f9fb",
                    "on-secondary-fixed-variant": "#006d64",
                    "on-primary": "#fbf7ff",
                    "surface-container-highest": "#dde3e7",
                    "error-dim": "#770326",
                    "on-tertiary-container": "#46009d",
                    "on-tertiary": "#fdf7ff",
                    "secondary-fixed": "#91feef",
                    "surface-container-low": "#f1f4f6",
                    "outline": "#757c7f",
                    "primary": "#5148d8",
                    "surface-bright": "#f7f9fb",
                    "tertiary-dim": "#681ad9",
                    "primary-dim": "#453acc",
                    "error-container": "#f76a80",
                    "on-surface-variant": "#596063",
                    "on-surface": "#2d3337",
                    "secondary-dim": "#005e56",
                    "tertiary-fixed": "#c7abff",
                    "on-tertiary-fixed": "#2b0066",
                    "tertiary": "#742fe5",
                    "on-primary-fixed-variant": "#3628be",
                    "inverse-on-surface": "#9a9d9f",
                    "on-secondary-container": "#006259",
                    "secondary": "#006b62",
                    "surface-variant": "#dde3e7",
                    "on-primary-container": "#2c18b6",
                    "error": "#ac3149",
                    "background": "#f7f9fb",
                    "on-error": "#fff7f7",
                    "primary-fixed": "#bdbaff",
                    "on-background": "#2d3337",
                    "surface-container-lowest": "#ffffff",
                    "on-secondary": "#e2fff9",
                    "surface-dim": "#d3dbdf",
                    "outline-variant": "#acb3b7",
                    "surface-container-high": "#e3e9ec",
                    "inverse-surface": "#0b0f10",
                    "tertiary-fixed-dim": "#bb9aff",
                    "secondary-container": "#91feef",
                    "on-primary-fixed": "#19008c",
                    "secondary-fixed-dim": "#83efe1",
                    "on-tertiary-fixed-variant": "#5100b3",
                    "inverse-primary": "#8681ff"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {},
            "fontFamily": {
                    "headline": [
                            "Manrope"
                    ],
                    "body": [
                            "Inter"
                    ],
                    "label": [
                            "Inter"
                    ]
            }
    },
        },
      }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-headline { font-family: 'Manrope', sans-serif; }
        .glass-panel {
            background: rgba(247, 249, 251, 0.7);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        }
        .bg-gradient-primary {
            background: linear-gradient(135deg, #5148d8 0%, #453acc 100%);
        }
        .ambient-shadow {
            box-shadow: 0px 12px 32px rgba(45, 51, 55, 0.06);
        }
        .ghost-border {
            border: 1px solid rgba(172, 179, 183, 0.15); /* outline-variant at 15% */
        }
    </style>
</head>
<body class="bg-surface text-on-surface flex min-h-screen selection:bg-primary-container selection:text-on-primary-container">
<!-- SideNavBar (Web) -->
<aside class="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-[#f1f4f6] dark:bg-slate-900 no-border tonal-shift flex-col p-4 gap-2 z-20">
<div class="mb-8 px-4 py-2">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
<span class="material-symbols-outlined text-lg" data-icon="dashboard">dashboard</span>
</div>
<div>
<h1 class="font-['Manrope'] font-extrabold text-lg text-[#5148d8] tracking-tight leading-tight">Roundtable OS</h1>
<p class="font-body text-xs text-outline tracking-wider uppercase mt-0.5">Editorial Engine</p>
</div>
</div>
</div>
<nav class="flex-1 flex flex-col gap-1">
<a class="flex items-center gap-3 px-4 py-2.5 text-[#5148d8] bg-white dark:bg-slate-800 shadow-[0px_12px_32px_rgba(45,51,55,0.06)] rounded-lg font-['Inter'] font-medium text-sm transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined text-[20px]" data-icon="dashboard" style="font-variation-settings: 'FILL' 1;">dashboard</span>
                Dashboard
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 rounded-lg font-['Inter'] font-medium text-sm transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined text-[20px]" data-icon="lightbulb">lightbulb</span>
                Ideas
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 rounded-lg font-['Inter'] font-medium text-sm transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined text-[20px]" data-icon="psychology">psychology</span>
                Brainstorming
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 rounded-lg font-['Inter'] font-medium text-sm transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined text-[20px]" data-icon="inventory_2">inventory_2</span>
                Resource Vault
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 rounded-lg font-['Inter'] font-medium text-sm transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined text-[20px]" data-icon="checklist">checklist</span>
                Task Manager
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 rounded-lg font-['Inter'] font-medium text-sm transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined text-[20px]" data-icon="settings">settings</span>
                Settings
            </a>
</nav>
<div class="mt-auto pt-4 flex flex-col gap-2">
<button class="bg-gradient-primary text-white rounded-lg px-4 py-3 font-medium text-sm w-full flex justify-center items-center gap-2 hover:opacity-90 transition-opacity ambient-shadow">
<span class="material-symbols-outlined text-[18px]" data-icon="add">add</span>
                New Spark
            </button>
<a class="flex items-center gap-3 px-4 py-2.5 text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 rounded-lg font-['Inter'] font-medium text-sm transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined text-[20px]" data-icon="help">help</span>
                Help Center
            </a>
</div>
</aside>
<!-- Main Content Area -->
<main class="flex-1 md:ml-64 flex flex-col min-h-screen relative overflow-hidden">
<!-- TopNavBar (Mobile fallback & top utility bar) -->
<header class="md:hidden flex justify-between items-center w-full px-6 py-3 bg-[#f7f9fb] dark:bg-slate-950 docked full-width top-0 z-30 bg-[#f1f4f6] dark:bg-slate-900 flat no-shadows">
<div class="font-['Manrope'] font-bold text-xl tracking-tighter text-[#2d3337] dark:text-white">Roundtable OS</div>
<div class="flex items-center gap-4">
<button class="text-[#757c7f] hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-colors p-2 rounded-full cursor-pointer active:scale-95 transition-transform">
<span class="material-symbols-outlined" data-icon="search">search</span>
</button>
<button class="text-[#757c7f] hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-colors p-2 rounded-full cursor-pointer active:scale-95 transition-transform">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
</div>
</header>
<!-- Top Utility Bar (Web) - Search & Actions -->
<div class="hidden md:flex justify-between items-center w-full px-8 py-4 bg-[#f7f9fb] dark:bg-slate-950 flat no-shadows sticky top-0 z-10 glass-panel">
<div class="relative w-96">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]" data-icon="search">search</span>
<input class="w-full bg-surface-container-highest border-none rounded-full pl-10 pr-4 py-2.5 font-body text-sm text-on-surface placeholder:text-outline focus:ring-0 focus:bg-surface-container-lowest focus:ghost-border transition-all duration-200" placeholder="Search ideas, resources, tasks..." type="text"/>
</div>
<div class="flex items-center gap-4">
<button class="text-[#757c7f] hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-colors p-2 rounded-full cursor-pointer active:scale-95 transition-transform">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<img alt="User profile" class="w-9 h-9 rounded-full object-cover cursor-pointer hover:ring-2 ring-primary-container transition-all" data-alt="Close up portrait of a professional woman with soft lighting and a neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTgWu3ewin0qQ6iBn1RttaC-cho_TC8nuJyUkknWCv9qddmYBRuOQ8clWWwyCKLT9ZNI8CqFrhuoPBvQrdY2qlIW8bywh_AVTVxNEzju7D22KdfDRCnd6fKYyVxZYH7fjBZ4FTN5oh_T_IUCXkNFqtIlUfdbXKs5A5kmctCR8z8K6dzqXpOdq4R5lhi7pLlusYq0MCL22zaBI4WGddMnX8ZEs7t3H-PS22B1KXoOGpH8H-aSskjW32JcQv1skgGJQ7o4FOBTJ0O3Q"/>
</div>
</div>
<div class="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto w-full flex-1">
<!-- Welcome Header -->
<div class="mb-12">
<h2 class="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2">Morning, Alex.</h2>
<p class="font-body text-on-surface-variant text-lg">Here’s what the Roundtable is processing today.</p>
</div>
<!-- Quick Actions Bento -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
<button class="bg-surface-container-lowest p-6 rounded-xl ambient-shadow flex flex-col items-start gap-4 hover:bg-surface-container-low transition-colors text-left group">
<div class="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center group-hover:scale-105 transition-transform">
<span class="material-symbols-outlined" data-icon="add" style="font-variation-settings: 'wght' 500;">add</span>
</div>
<div>
<h3 class="font-headline font-bold text-on-surface">Add Idea</h3>
<p class="font-body text-xs text-outline mt-1">Capture a spark</p>
</div>
</button>
<button class="bg-surface-container-lowest p-6 rounded-xl ambient-shadow flex flex-col items-start gap-4 hover:bg-surface-container-low transition-colors text-left group">
<div class="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center group-hover:scale-105 transition-transform">
<span class="material-symbols-outlined" data-icon="psychology" style="font-variation-settings: 'wght' 500;">psychology</span>
</div>
<div>
<h3 class="font-headline font-bold text-on-surface">Start Brainstorm</h3>
<p class="font-body text-xs text-outline mt-1">Consult the AI</p>
</div>
</button>
<button class="bg-surface-container-lowest p-6 rounded-xl ambient-shadow flex flex-col items-start gap-4 hover:bg-surface-container-low transition-colors text-left group">
<div class="w-10 h-10 rounded-lg bg-tertiary-container text-on-tertiary-container flex items-center justify-center group-hover:scale-105 transition-transform">
<span class="material-symbols-outlined" data-icon="upload_file" style="font-variation-settings: 'wght' 500;">upload_file</span>
</div>
<div>
<h3 class="font-headline font-bold text-on-surface">Add Resource</h3>
<p class="font-body text-xs text-outline mt-1">To the vault</p>
</div>
</button>
<button class="bg-surface-container-lowest p-6 rounded-xl ambient-shadow flex flex-col items-start gap-4 hover:bg-surface-container-low transition-colors text-left group">
<div class="w-10 h-10 rounded-lg bg-surface-container-highest text-on-surface-variant flex items-center justify-center group-hover:scale-105 transition-transform">
<span class="material-symbols-outlined" data-icon="task_alt" style="font-variation-settings: 'wght' 500;">task_alt</span>
</div>
<div>
<h3 class="font-headline font-bold text-on-surface">View Tasks</h3>
<p class="font-body text-xs text-outline mt-1">12 pending</p>
</div>
</button>
</div>
<div class="grid lg:grid-cols-3 gap-12">
<!-- Main Content Column (2/3) -->
<div class="lg:col-span-2 space-y-12">
<!-- Top Priorities -->
<section>
<div class="flex items-center justify-between mb-6">
<h3 class="font-headline text-2xl font-bold text-on-surface tracking-tight">Top Priorities</h3>
<a class="text-primary text-sm font-medium hover:underline flex items-center gap-1" href="#">View all <span class="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span></a>
</div>
<div class="flex flex-col gap-4">
<!-- Priority Card 1 -->
<div class="bg-surface-container-lowest p-6 rounded-xl ambient-shadow relative overflow-hidden group">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
<div class="flex justify-between items-start">
<div>
<div class="flex items-center gap-2 mb-2">
<span class="bg-primary-container text-on-primary-container text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm">Building</span>
<span class="text-outline text-xs font-body flex items-center gap-1"><span class="material-symbols-outlined text-[14px]" data-icon="folder">folder</span> Marketing</span>
</div>
<h4 class="font-headline font-bold text-xl text-on-surface mb-2">Q3 Content Syndication Strategy</h4>
<p class="font-body text-on-surface-variant text-sm pr-8">Finalizing the automated workflow for distributing core essays across medium and substack.</p>
</div>
<div class="flex flex-col items-end">
<div class="text-right">
<span class="font-headline text-3xl font-extrabold text-primary">94</span>
<p class="font-body text-[10px] text-outline uppercase tracking-wider">Priority Score</p>
</div>
</div>
</div>
</div>
<!-- Priority Card 2 -->
<div class="bg-surface-container-lowest p-6 rounded-xl ambient-shadow relative overflow-hidden group">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
<div class="flex justify-between items-start">
<div>
<div class="flex items-center gap-2 mb-2">
<span class="bg-secondary-container text-on-secondary-container text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm">Validating</span>
<span class="text-outline text-xs font-body flex items-center gap-1"><span class="material-symbols-outlined text-[14px]" data-icon="folder">folder</span> Product</span>
</div>
<h4 class="font-headline font-bold text-xl text-on-surface mb-2">AI Onboarding Flow Redesign</h4>
<p class="font-body text-on-surface-variant text-sm pr-8">Testing prototype with the internal team to reduce friction in the first 5 minutes.</p>
</div>
<div class="flex flex-col items-end">
<div class="text-right">
<span class="font-headline text-3xl font-extrabold text-secondary">88</span>
<p class="font-body text-[10px] text-outline uppercase tracking-wider">Priority Score</p>
</div>
</div>
</div>
</div>
<!-- Priority Card 3 -->
<div class="bg-surface-container-lowest p-6 rounded-xl ambient-shadow relative overflow-hidden group">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-tertiary"></div>
<div class="flex justify-between items-start">
<div>
<div class="flex items-center gap-2 mb-2">
<span class="bg-tertiary-container text-on-tertiary-container text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm">Planned</span>
<span class="text-outline text-xs font-body flex items-center gap-1"><span class="material-symbols-outlined text-[14px]" data-icon="folder">folder</span> Operations</span>
</div>
<h4 class="font-headline font-bold text-xl text-on-surface mb-2">Vendor API Migration</h4>
<p class="font-body text-on-surface-variant text-sm pr-8">Scheduled for next sprint. Needs final sign-off from engineering lead.</p>
</div>
<div class="flex flex-col items-end">
<div class="text-right">
<span class="font-headline text-3xl font-extrabold text-tertiary">82</span>
<p class="font-body text-[10px] text-outline uppercase tracking-wider">Priority Score</p>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
<!-- Right Sidebar Column (1/3) -->
<div class="space-y-12">
<!-- Idea Pipeline Summary -->
<section>
<h3 class="font-headline text-lg font-bold text-on-surface tracking-tight mb-6">Pipeline Overview</h3>
<div class="bg-surface-container-low rounded-xl p-4 flex flex-col gap-2">
<div class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer">
<div class="flex items-center gap-3">
<div class="w-3 h-3 rounded-full bg-primary-container"></div>
<span class="font-body text-sm font-medium">Inbox / Spark</span>
</div>
<span class="font-headline font-bold text-on-surface-variant">14</span>
</div>
<div class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer">
<div class="flex items-center gap-3">
<div class="w-3 h-3 rounded-full bg-secondary-container"></div>
<span class="font-body text-sm font-medium">Exploring / Validating</span>
</div>
<span class="font-headline font-bold text-on-surface-variant">8</span>
</div>
<div class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer">
<div class="flex items-center gap-3">
<div class="w-3 h-3 rounded-full bg-tertiary-container"></div>
<span class="font-body text-sm font-medium">Planned / Building</span>
</div>
<span class="font-headline font-bold text-on-surface-variant">5</span>
</div>
<div class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer">
<div class="flex items-center gap-3">
<div class="w-3 h-3 rounded-full bg-[#a7f3d0]"></div> <!-- Soft Emerald -->
<span class="font-body text-sm font-medium">Launched</span>
</div>
<span class="font-headline font-bold text-on-surface-variant">32</span>
</div>
<div class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer">
<div class="flex items-center gap-3">
<div class="w-3 h-3 rounded-full bg-surface-variant"></div>
<span class="font-body text-sm font-medium text-outline">Paused / Archived</span>
</div>
<span class="font-headline font-bold text-outline">41</span>
</div>
</div>
</section>
<!-- Recent Roundtable Activity -->
<section>
<h3 class="font-headline text-lg font-bold text-on-surface tracking-tight mb-6">Recent Insights</h3>
<div class="flex flex-col gap-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-container-highest before:to-transparent">
<!-- Insight 1 -->
<div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
<div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white border-4 border-surface shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
<span class="font-headline text-xs font-bold">K</span>
</div>
<div class="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-surface-container-lowest p-4 rounded-xl ambient-shadow ml-4 md:ml-0 relative">
<div class="absolute top-0 bottom-0 left-0 w-0.5 bg-primary rounded-l-xl"></div>
<p class="font-body text-xs text-primary font-bold uppercase tracking-wider mb-1">Kai (Visionary)</p>
<p class="font-body text-sm text-on-surface leading-relaxed text-left">The Q3 Content Strategy aligns well with our long-term brand goals, but we should consider adding a video component for broader reach.</p>
</div>
</div>
<!-- Insight 2 -->
<div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
<div class="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white border-4 border-surface shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
<span class="font-headline text-xs font-bold">N</span>
</div>
<div class="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-surface-container-lowest p-4 rounded-xl ambient-shadow ml-4 md:ml-0 relative">
<div class="absolute top-0 bottom-0 left-0 w-0.5 bg-secondary rounded-l-xl"></div>
<p class="font-body text-xs text-secondary font-bold uppercase tracking-wider mb-1">Nova (Strategist)</p>
<p class="font-body text-sm text-on-surface leading-relaxed text-left">Video increases production time by 40%. Recommend sticking to text for Q3 and building video capability in Q4.</p>
</div>
</div>
</div>
</section>
</div>
</div>
</div>
</main>
</body></html>

<!-- Dashboard -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Roundtable OS - New Spark</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "tertiary-container": "#c7abff",
                        "on-error-container": "#68001f",
                        "surface-tint": "#5148d8",
                        "surface-container": "#eaeef1",
                        "on-secondary-fixed": "#004e47",
                        "primary-fixed-dim": "#aeabff",
                        "primary-container": "#bdbaff",
                        "surface": "#f7f9fb",
                        "on-secondary-fixed-variant": "#006d64",
                        "on-primary": "#fbf7ff",
                        "surface-container-highest": "#dde3e7",
                        "error-dim": "#770326",
                        "on-tertiary-container": "#46009d",
                        "on-tertiary": "#fdf7ff",
                        "secondary-fixed": "#91feef",
                        "surface-container-low": "#f1f4f6",
                        "outline": "#757c7f",
                        "primary": "#5148d8",
                        "surface-bright": "#f7f9fb",
                        "tertiary-dim": "#681ad9",
                        "primary-dim": "#453acc",
                        "error-container": "#f76a80",
                        "on-surface-variant": "#596063",
                        "on-surface": "#2d3337",
                        "secondary-dim": "#005e56",
                        "tertiary-fixed": "#c7abff",
                        "on-tertiary-fixed": "#2b0066",
                        "tertiary": "#742fe5",
                        "on-primary-fixed-variant": "#3628be",
                        "inverse-on-surface": "#9a9d9f",
                        "on-secondary-container": "#006259",
                        "secondary": "#006b62",
                        "surface-variant": "#dde3e7",
                        "on-primary-container": "#2c18b6",
                        "error": "#ac3149",
                        "background": "#f7f9fb",
                        "on-error": "#fff7f7",
                        "primary-fixed": "#bdbaff",
                        "on-background": "#2d3337",
                        "surface-container-lowest": "#ffffff",
                        "on-secondary": "#e2fff9",
                        "surface-dim": "#d3dbdf",
                        "outline-variant": "#acb3b7",
                        "surface-container-high": "#e3e9ec",
                        "inverse-surface": "#0b0f10",
                        "tertiary-fixed-dim": "#bb9aff",
                        "secondary-container": "#91feef",
                        "on-primary-fixed": "#19008c",
                        "secondary-fixed-dim": "#83efe1",
                        "on-tertiary-fixed-variant": "#5100b3",
                        "inverse-primary": "#8681ff"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {},
                    "fontFamily": {
                        "headline": ["Manrope", "sans-serif"],
                        "body": ["Inter", "sans-serif"],
                        "label": ["Inter", "sans-serif"]
                    }
                },
            },
        }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; background-color: #f7f9fb; }
        .font-headline { font-family: 'Manrope', sans-serif; letter-spacing: -0.02em; }
        .glass-panel {
            background: rgba(247, 249, 251, 0.85);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        }
        .bg-gradient-primary {
            background: linear-gradient(135deg, #5148d8 0%, #453acc 100%);
        }
        .ghost-border { border: 1px solid rgba(172, 179, 183, 0.15); }
    </style>
</head>
<body class="bg-surface text-on-surface antialiased min-h-screen flex">
<!-- SideNavBar (Suppressed for focused task, but per instructions "dedicated page with SideNavBar", we will include it but dimmed or secondary focus) -->
<nav class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low text-primary p-4 gap-2 border-r border-transparent z-10 transition-all duration-200 ease-in-out">
<div class="mb-8 px-4 py-2">
<h1 class="font-headline font-extrabold text-lg text-primary tracking-tighter">Roundtable OS</h1>
<p class="font-body text-xs text-outline mt-1 uppercase tracking-wider">Editorial Engine</p>
</div>
<div class="flex-1 space-y-1">
<a class="flex items-center gap-3 px-4 py-2.5 font-body font-medium text-sm text-outline hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                Dashboard
            </a>
<!-- Ideas is active parent, but we are in a sub-task -->
<a class="flex items-center gap-3 px-4 py-2.5 font-body font-medium text-sm text-primary bg-surface-container-lowest shadow-[0px_12px_32px_rgba(45,51,55,0.06)] rounded-lg transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="lightbulb" style="font-variation-settings: 'FILL' 1;">lightbulb</span>
                Ideas
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 font-body font-medium text-sm text-outline hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="psychology">psychology</span>
                Brainstorming
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 font-body font-medium text-sm text-outline hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
                Resource Vault
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 font-body font-medium text-sm text-outline hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="checklist">checklist</span>
                Task Manager
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 font-body font-medium text-sm text-outline hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
                Settings
            </a>
</div>
<div class="mt-auto">
<button class="w-full flex items-center justify-center gap-2 bg-gradient-primary text-white font-body font-medium text-sm px-4 py-3 rounded-md shadow-[0px_12px_32px_rgba(45,51,55,0.06)] mb-4 hover:opacity-90 transition-opacity">
<span class="material-symbols-outlined text-[18px]">add</span>
                New Spark
            </button>
<a class="flex items-center gap-3 px-4 py-2 font-body font-medium text-sm text-outline hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="help">help</span>
                Help Center
            </a>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="flex-1 md:ml-64 relative min-h-screen">
<!-- TopAppBar (Mobile & Utility) -->
<header class="flex justify-between items-center w-full px-6 py-4 bg-surface md:bg-transparent z-20">
<div class="md:hidden flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-2xl">menu</span>
<span class="font-headline font-bold text-lg text-on-surface tracking-tighter">Roundtable OS</span>
</div>
<div class="hidden md:flex items-center gap-2">
<!-- Breadcrumb style -->
<a class="text-outline hover:text-primary font-body text-sm transition-colors" href="#">Ideas</a>
<span class="material-symbols-outlined text-outline text-sm">chevron_right</span>
<span class="text-on-surface font-body text-sm font-medium">Capture Spark</span>
</div>
<div class="flex items-center gap-4">
<button class="text-outline hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<img alt="User profile" class="w-8 h-8 rounded-full object-cover ghost-border cursor-pointer active:scale-95 transition-transform" data-alt="close-up portrait of a young woman with natural makeup, soft studio lighting, neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPHFzUuxOM7qXpQWTqva5qrTwwpMTyG3d-Yv2igOGnI49D0G0A_XWOM4ESdHO8INSB9R4zakMr3cvaOpbVSRfXf3bupNd1iPFdxZoIzfY2NiB3xXcxLn5EI89-XIT9xRHlR0PKfWwznQGh-Xh4XB2RXWgZ9zaq1lUCo-6ebdwuVQgSNFLjmXNOYMZ4R0m2t8pFeQW_zsX-n3AEP81A3IVFamRUEJqrb15kKMn0HnXQfQ2uza9Bqq_IZIOzB7L2bPYl3IrVNRU-Nvk"/>
</div>
</header>
<!-- Form Container - Architectural Focus Layout -->
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
<div class="mb-10 text-center md:text-left">
<h2 class="font-headline text-3xl md:text-4xl font-extrabold text-on-surface mb-3 tracking-tighter">Capture a Spark</h2>
<p class="font-body text-on-surface-variant text-base md:text-lg max-w-2xl">Record a new concept for the Roundtable to analyze. The more context you provide, the sharper the insights will be.</p>
</div>
<div class="bg-surface-container-lowest rounded-xl shadow-[0px_12px_32px_rgba(45,51,55,0.06)] p-6 md:p-10 ghost-border relative overflow-hidden">
<!-- Decorative subtle element -->
<div class="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full blur-[80px] opacity-30 -mr-32 -mt-32 pointer-events-none"></div>
<form action="#" class="space-y-8 relative z-10" method="POST">
<!-- Section 1: The Core -->
<div class="space-y-6">
<div>
<label class="block font-label text-sm font-medium text-on-surface mb-2 tracking-wide uppercase" for="idea_name">Idea Name</label>
<input class="block w-full bg-surface-container-highest border-transparent rounded-md py-3 px-4 font-body text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:border-primary focus:ring-0 transition-colors duration-200" id="idea_name" name="idea_name" placeholder="e.g., Project Phoenix" type="text"/>
</div>
<div>
<label class="block font-label text-sm font-medium text-on-surface mb-2 tracking-wide uppercase" for="summary">Summary</label>
<textarea class="block w-full bg-surface-container-highest border-transparent rounded-md py-3 px-4 font-body text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:border-primary focus:ring-0 transition-colors duration-200 resize-none" id="summary" name="summary" placeholder="Briefly describe the concept..." rows="3"></textarea>
</div>
</div>
<!-- Section 2: Strategy Details (Bento-ish grid) -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-transparent" style="border-top-color: var(--color-surface-container-highest);">
<div class="md:col-span-2">
<label class="block font-label text-sm font-medium text-on-surface mb-2 tracking-wide uppercase" for="problem_solved">Problem Solved</label>
<textarea class="block w-full bg-surface-container-highest border-transparent rounded-md py-3 px-4 font-body text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:border-primary focus:ring-0 transition-colors duration-200 resize-none" id="problem_solved" name="problem_solved" placeholder="What pain point does this address?" rows="3"></textarea>
</div>
<div>
<label class="block font-label text-sm font-medium text-on-surface mb-2 tracking-wide uppercase" for="target_users">Target Users</label>
<input class="block w-full bg-surface-container-highest border-transparent rounded-md py-3 px-4 font-body text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:border-primary focus:ring-0 transition-colors duration-200" id="target_users" name="target_users" placeholder="e.g., Remote Freelancers" type="text"/>
</div>
<div>
<label class="block font-label text-sm font-medium text-on-surface mb-2 tracking-wide uppercase" for="unique_value">Unique Value</label>
<input class="block w-full bg-surface-container-highest border-transparent rounded-md py-3 px-4 font-body text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:border-primary focus:ring-0 transition-colors duration-200" id="unique_value" name="unique_value" placeholder="The key differentiator" type="text"/>
</div>
</div>
<!-- Section 3: Metadata -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-transparent" style="border-top-color: var(--color-surface-container-highest);">
<div>
<label class="block font-label text-sm font-medium text-on-surface mb-2 tracking-wide uppercase" for="category">Category</label>
<div class="relative">
<select class="appearance-none block w-full bg-surface-container-highest border-transparent rounded-md py-3 pl-4 pr-10 font-body text-on-surface focus:bg-surface-container-lowest focus:border-primary focus:ring-0 transition-colors duration-200" id="category" name="category">
<option>Product Feature</option>
<option>Marketing Campaign</option>
<option>Process Improvement</option>
<option>New Market</option>
</select>
<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-outline">
<span class="material-symbols-outlined text-[20px]">expand_more</span>
</div>
</div>
</div>
<div>
<label class="block font-label text-sm font-medium text-on-surface mb-2 tracking-wide uppercase" for="stage">Stage</label>
<div class="relative">
<select class="appearance-none block w-full bg-surface-container-highest border-transparent rounded-md py-3 pl-4 pr-10 font-body text-on-surface focus:bg-surface-container-lowest focus:border-primary focus:ring-0 transition-colors duration-200" id="stage" name="stage">
<option selected="">Inbox / Spark</option>
<option>Exploring</option>
<option>Planned</option>
</select>
<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-outline">
<span class="material-symbols-outlined text-[20px]">expand_more</span>
</div>
</div>
</div>
<div>
<label class="block font-label text-sm font-medium text-on-surface mb-2 tracking-wide uppercase" for="tags">Tags</label>
<input class="block w-full bg-surface-container-highest border-transparent rounded-md py-3 px-4 font-body text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:border-primary focus:ring-0 transition-colors duration-200" id="tags" name="tags" placeholder="Comma separated" type="text"/>
</div>
</div>
<!-- Actions -->
<div class="pt-8 flex flex-col-reverse md:flex-row justify-end gap-4">
<button class="px-6 py-3 font-body font-medium text-sm text-primary bg-transparent rounded-md ghost-border hover:bg-surface-container-high transition-colors duration-200" type="button">
                            Cancel
                        </button>
<button class="px-8 py-3 font-body font-medium text-sm text-white bg-gradient-primary rounded-md shadow-[0px_12px_32px_rgba(45,51,55,0.06)] hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2" type="submit">
<span class="material-symbols-outlined text-[18px]">save</span>
                            Save Idea
                        </button>
</div>
</form>
</div>
<!-- Contextual Hint -->
<div class="mt-8 flex items-start gap-4 p-4 rounded-xl bg-surface-container-low">
<span class="material-symbols-outlined text-secondary mt-0.5">info</span>
<p class="font-body text-sm text-on-surface-variant leading-relaxed">
                    Once saved, your spark will appear in the Inbox. You can then summon the Roundtable personas (Kai, Nova, Rex) to brainstorm and expand upon these initial thoughts.
                </p>
</div>
</div>
</main>
</body></html>

<!-- Add New Idea -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Roundtable OS - Idea Detail</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Manrope:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "tertiary-container": "#c7abff",
                        "on-error-container": "#68001f",
                        "surface-tint": "#5148d8",
                        "surface-container": "#eaeef1",
                        "on-secondary-fixed": "#004e47",
                        "primary-fixed-dim": "#aeabff",
                        "primary-container": "#bdbaff",
                        "surface": "#f7f9fb",
                        "on-secondary-fixed-variant": "#006d64",
                        "on-primary": "#fbf7ff",
                        "surface-container-highest": "#dde3e7",
                        "error-dim": "#770326",
                        "on-tertiary-container": "#46009d",
                        "on-tertiary": "#fdf7ff",
                        "secondary-fixed": "#91feef",
                        "surface-container-low": "#f1f4f6",
                        "outline": "#757c7f",
                        "primary": "#5148d8",
                        "surface-bright": "#f7f9fb",
                        "tertiary-dim": "#681ad9",
                        "primary-dim": "#453acc",
                        "error-container": "#f76a80",
                        "on-surface-variant": "#596063",
                        "on-surface": "#2d3337",
                        "secondary-dim": "#005e56",
                        "tertiary-fixed": "#c7abff",
                        "on-tertiary-fixed": "#2b0066",
                        "tertiary": "#742fe5",
                        "on-primary-fixed-variant": "#3628be",
                        "inverse-on-surface": "#9a9d9f",
                        "on-secondary-container": "#006259",
                        "secondary": "#006b62",
                        "surface-variant": "#dde3e7",
                        "on-primary-container": "#2c18b6",
                        "error": "#ac3149",
                        "background": "#f7f9fb",
                        "on-error": "#fff7f7",
                        "primary-fixed": "#bdbaff",
                        "on-background": "#2d3337",
                        "surface-container-lowest": "#ffffff",
                        "on-secondary": "#e2fff9",
                        "surface-dim": "#d3dbdf",
                        "outline-variant": "#acb3b7",
                        "surface-container-high": "#e3e9ec",
                        "inverse-surface": "#0b0f10",
                        "tertiary-fixed-dim": "#bb9aff",
                        "secondary-container": "#91feef",
                        "on-primary-fixed": "#19008c",
                        "secondary-fixed-dim": "#83efe1",
                        "on-tertiary-fixed-variant": "#5100b3",
                        "inverse-primary": "#8681ff"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {},
                    "fontFamily": {
                        "headline": ["Manrope"],
                        "body": ["Inter"],
                        "label": ["Inter"]
                    }
                },
            },
        }
    </script>
</head>
<body class="bg-surface text-on-surface font-body min-h-screen flex">
<nav class="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-[#f1f4f6] dark:bg-slate-900 flex-col p-4 gap-2 no-border tonal-shift flat font-['Inter'] font-medium text-sm transition-all duration-200 ease-in-out">
<div class="mb-8 px-2 flex items-center gap-3">
<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center text-on-primary shadow-[0px_12px_32px_rgba(45,51,55,0.06)]">
<span class="material-symbols-outlined text-[1.2rem]">auto_awesome</span>
</div>
<div>
<div class="font-['Manrope'] font-extrabold text-lg text-[#5148d8]">Roundtable OS</div>
<div class="text-[0.7rem] text-outline tracking-wider uppercase">Editorial Engine</div>
</div>
</div>
<button class="mb-6 w-full py-2.5 px-4 rounded-lg bg-gradient-to-br from-primary to-primary-dim text-white font-medium shadow-[0px_12px_32px_rgba(45,51,55,0.06)] hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-sm">add</span>
            New Spark
        </button>
<div class="flex flex-col gap-1 flex-1">
<a class="flex items-center gap-3 px-3 py-2.5 text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 rounded-lg" href="#">
<span class="material-symbols-outlined">dashboard</span>
                Dashboard
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 text-[#5148d8] bg-white dark:bg-slate-800 shadow-[0px_12px_32px_rgba(45,51,55,0.06)] rounded-lg" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">lightbulb</span>
                Ideas
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 rounded-lg" href="#">
<span class="material-symbols-outlined">psychology</span>
                Brainstorming
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 rounded-lg" href="#">
<span class="material-symbols-outlined">inventory_2</span>
                Resource Vault
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 rounded-lg" href="#">
<span class="material-symbols-outlined">checklist</span>
                Task Manager
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 rounded-lg" href="#">
<span class="material-symbols-outlined">settings</span>
                Settings
            </a>
</div>
<div class="mt-auto">
<a class="flex items-center gap-3 px-3 py-2.5 text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 rounded-lg" href="#">
<span class="material-symbols-outlined">help</span>
                Help Center
            </a>
</div>
</nav>
<main class="flex-1 md:ml-64 flex flex-col min-h-screen">
<header class="md:hidden flex justify-between items-center w-full px-6 py-3 bg-[#f7f9fb] dark:bg-slate-950 font-['Inter'] text-sm tracking-tight docked full-width top-0 no-shadows bg-[#f1f4f6] dark:bg-slate-900 sticky z-50">
<div class="font-['Manrope'] font-bold text-xl tracking-tighter text-[#2d3337] dark:text-white">Roundtable OS</div>
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-[#757c7f] cursor-pointer hover:text-[#2d3337] transition-colors">notifications</span>
<img alt="User profile" class="w-8 h-8 rounded-full border border-outline-variant/15" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_rvpzMlB56dSgWEwFXKXD4iVEJlWGlBlCsrNxIg5afe2BJhWAxRTrYKaQTgGiNVMttkDR3ayigk7siWTfazMuE1dS9URA4u-AZ6dDoQzZcM8SzltEIWd5y-ul-t43WCJFD18fU_q4OTJyzutZFUXLEoI00Z0CtvEwWv0IoJm8I--U9svdXQU4uTYBgSDOv_4Yqyil5oPsABE8o94B7-qLhVH0bIiMvUvD4PG0wPcHNPnCZ76wWSo9uGqVtpGqcDg3zu3ZApdxTU8"/>
</div>
</header>
<div class="p-8 max-w-7xl mx-auto w-full space-y-8 flex-1">
<div class="flex items-start justify-between">
<div>
<div class="flex items-center gap-2 mb-2">
<span class="text-xs font-semibold tracking-wider uppercase text-secondary px-2 py-1 bg-secondary-container rounded-sm">Validating</span>
<span class="text-sm text-outline">Created Oct 24, 2023</span>
</div>
<h1 class="font-headline text-4xl tracking-tight text-on-surface mb-2">Project 'Loomis' Narrative Engine</h1>
<p class="text-on-surface-variant text-lg max-w-2xl">A dynamic, context-aware storytelling framework designed to adapt to user interaction in real-time, utilizing generative models for world-building.</p>
</div>
<div class="flex gap-3">
<button class="px-4 py-2 rounded-md border border-outline-variant/15 text-primary font-medium hover:bg-surface-container-high transition-colors">Edit Details</button>
<button class="px-4 py-2 rounded-md bg-gradient-to-br from-primary to-primary-dim text-white font-medium shadow-[0px_12px_32px_rgba(45,51,55,0.06)] hover:opacity-90 transition-opacity">Launch Spark</button>
</div>
</div>
<div class="flex gap-6 border-b border-surface-container-high pb-0">
<button class="px-4 py-3 border-b-2 border-primary text-primary font-medium">Overview &amp; Core</button>
<button class="px-4 py-3 text-outline hover:text-on-surface transition-colors">Session History</button>
<button class="px-4 py-3 text-outline hover:text-on-surface transition-colors">Tasks &amp; Plan</button>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
<div class="lg:col-span-2 space-y-8">
<section class="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_12px_32px_rgba(45,51,55,0.03)]">
<h2 class="font-headline text-xl mb-4 text-on-surface">Core Hypothesis</h2>
<div class="bg-surface p-4 rounded-lg text-on-surface-variant leading-relaxed border border-outline-variant/10">
                            Current narrative structures in gaming are too rigid. By employing a layered generative approach, we can maintain narrative coherence while allowing for emergent, player-driven storylines that feel authored rather than procedurally generated. The key is in the 'Constraint Engine' working tandem with the LLM.
                        </div>
</section>
<section>
<h2 class="font-headline text-xl mb-4 text-on-surface">Recent Brainstorm Session</h2>
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_12px_32px_rgba(45,51,55,0.03)] space-y-6">
<div class="flex gap-4">
<div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-primary">psychology</span>
</div>
<div class="flex-1 relative">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary -ml-6 rounded-full"></div>
<div class="flex items-center gap-2 mb-1">
<span class="font-medium text-sm text-primary uppercase tracking-wide">Kai (Visionary)</span>
<span class="text-xs text-outline">10:42 AM</span>
</div>
<p class="text-on-surface-variant text-right text-left">We need to think beyond branching dialogue. What if the environment itself reacts narratively? The weather, the ambient sounds... they all shift based on the emotional undertone of the current scene's context.</p>
</div>
</div>
<div class="flex gap-4">
<div class="w-10 h-10 rounded-full bg-error-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-error">gavel</span>
</div>
<div class="flex-1 relative">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-error -ml-6 rounded-full"></div>
<div class="flex items-center gap-2 mb-1">
<span class="font-medium text-sm text-error uppercase tracking-wide">Sage (Critic)</span>
<span class="text-xs text-outline">10:45 AM</span>
</div>
<p class="text-on-surface-variant text-left">That sounds resource-heavy and hard to test. If the environment is dynamically generated based on abstract 'emotional states', QA will be a nightmare. We need hard constraints on what elements the engine is allowed to modify.</p>
</div>
</div>
</div>
</section>
</div>
<div class="space-y-6">
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_12px_32px_rgba(45,51,55,0.03)]">
<h3 class="font-headline text-lg mb-4">Viability Score</h3>
<div class="flex items-center justify-center py-4">
<div class="relative w-32 h-32 flex items-center justify-center">
<svg class="w-full h-full transform -rotate-90" viewbox="0 0 36 36">
<path class="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3"></path>
<path class="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="82, 100" stroke-width="3"></path>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center">
<span class="font-headline text-3xl text-on-surface">82</span>
<span class="text-xs text-outline uppercase tracking-wider">High</span>
</div>
</div>
</div>
<div class="space-y-3 mt-4">
<div class="flex justify-between items-center text-sm">
<span class="text-on-surface-variant">Technical Feasibility</span>
<span class="font-medium text-on-surface">75/100</span>
</div>
<div class="flex justify-between items-center text-sm">
<span class="text-on-surface-variant">Market Novelty</span>
<span class="font-medium text-secondary">92/100</span>
</div>
</div>
</div>
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_12px_32px_rgba(45,51,55,0.03)]">
<h3 class="font-headline text-lg mb-4 flex items-center gap-2">
<span class="material-symbols-outlined text-outline text-xl">link</span>
                            Resources
                        </h3>
<ul class="space-y-3">
<li>
<a class="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-low transition-colors group" href="#">
<div class="w-8 h-8 rounded bg-surface flex items-center justify-center border border-outline-variant/15">
<span class="material-symbols-outlined text-on-surface-variant text-sm group-hover:text-primary transition-colors">description</span>
</div>
<span class="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">Architecture Draft.md</span>
</a>
</li>
<li>
<a class="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-low transition-colors group" href="#">
<div class="w-8 h-8 rounded bg-surface flex items-center justify-center border border-outline-variant/15">
<span class="material-symbols-outlined text-on-surface-variant text-sm group-hover:text-primary transition-colors">code</span>
</div>
<span class="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">API Constraint Specs</span>
</a>
</li>
</ul>
</div>
</div>
</div>
</div>
</main>
</body></html>

<!-- Idea Details -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Roundtable OS - Brainstorming</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "tertiary-container": "#c7abff",
                        "on-error-container": "#68001f",
                        "surface-tint": "#5148d8",
                        "surface-container": "#eaeef1",
                        "on-secondary-fixed": "#004e47",
                        "primary-fixed-dim": "#aeabff",
                        "primary-container": "#bdbaff",
                        "surface": "#f7f9fb",
                        "on-secondary-fixed-variant": "#006d64",
                        "on-primary": "#fbf7ff",
                        "surface-container-highest": "#dde3e7",
                        "error-dim": "#770326",
                        "on-tertiary-container": "#46009d",
                        "on-tertiary": "#fdf7ff",
                        "secondary-fixed": "#91feef",
                        "surface-container-low": "#f1f4f6",
                        "outline": "#757c7f",
                        "primary": "#5148d8",
                        "surface-bright": "#f7f9fb",
                        "tertiary-dim": "#681ad9",
                        "primary-dim": "#453acc",
                        "error-container": "#f76a80",
                        "on-surface-variant": "#596063",
                        "on-surface": "#2d3337",
                        "secondary-dim": "#005e56",
                        "tertiary-fixed": "#c7abff",
                        "on-tertiary-fixed": "#2b0066",
                        "tertiary": "#742fe5",
                        "on-primary-fixed-variant": "#3628be",
                        "inverse-on-surface": "#9a9d9f",
                        "on-secondary-container": "#006259",
                        "secondary": "#006b62",
                        "surface-variant": "#dde3e7",
                        "on-primary-container": "#2c18b6",
                        "error": "#ac3149",
                        "background": "#f7f9fb",
                        "on-error": "#fff7f7",
                        "primary-fixed": "#bdbaff",
                        "on-background": "#2d3337",
                        "surface-container-lowest": "#ffffff",
                        "on-secondary": "#e2fff9",
                        "surface-dim": "#d3dbdf",
                        "outline-variant": "#acb3b7",
                        "surface-container-high": "#e3e9ec",
                        "inverse-surface": "#0b0f10",
                        "tertiary-fixed-dim": "#bb9aff",
                        "secondary-container": "#91feef",
                        "on-primary-fixed": "#19008c",
                        "secondary-fixed-dim": "#83efe1",
                        "on-tertiary-fixed-variant": "#5100b3",
                        "inverse-primary": "#8681ff"
                    },
                    borderRadius: {
                        DEFAULT: "0.125rem",
                        lg: "0.25rem",
                        xl: "0.5rem",
                        full: "0.75rem"
                    },
                    fontFamily: {
                        headline: ["Manrope", "sans-serif"],
                        body: ["Inter", "sans-serif"],
                        label: ["Inter", "sans-serif"]
                    }
                }
            }
        }
    </script>
<style>
        .glass-panel {
            background: rgba(247, 249, 251, 0.85);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        }
        .btn-gradient {
            background: linear-gradient(135deg, #5148d8 0%, #453acc 100%);
        }
        /* Custom scrollbar to keep it clean */
        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: #d3dbdf;
            border-radius: 4px;
        }
    </style>
</head>
<body class="bg-surface font-body text-on-surface antialiased flex h-screen overflow-hidden">
<!-- SideNavBar -->
<nav class="h-screen w-64 fixed left-0 top-0 bg-[#f1f4f6] dark:bg-slate-900 z-50 flex flex-col p-4 gap-2 no-border tonal-shift">
<div class="mb-8 px-2 flex flex-col gap-1">
<h1 class="font-['Manrope'] font-extrabold text-lg text-[#5148d8] tracking-tight">Roundtable OS</h1>
<span class="font-label text-xs text-on-surface-variant uppercase tracking-wider">Editorial Engine</span>
</div>
<button class="mb-6 btn-gradient text-white rounded-lg py-2.5 px-4 font-body font-medium text-sm flex items-center justify-center gap-2 shadow-[0px_12px_32px_rgba(45,51,55,0.06)] hover:opacity-90 transition-opacity">
<span class="material-symbols-outlined" style="font-size: 18px;">add</span>
            New Spark
        </button>
<div class="flex-1 flex flex-col gap-1">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined">dashboard</span>
                Dashboard
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined">lightbulb</span>
                Ideas
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#5148d8] bg-white dark:bg-slate-800 shadow-[0px_12px_32px_rgba(45,51,55,0.06)] transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined" data-weight="fill" style="font-variation-settings: 'FILL' 1;">psychology</span>
                Brainstorming
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined">inventory_2</span>
                Resource Vault
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined">checklist</span>
                Task Manager
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined">settings</span>
                Settings
            </a>
</div>
<div class="mt-auto">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined">help</span>
                Help Center
            </a>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="ml-64 flex-1 flex flex-col h-full bg-surface">
<!-- TopAppBar -->
<header class="flex justify-between items-center w-full px-6 py-3 bg-[#f7f9fb] dark:bg-slate-950 docked full-width top-0 flat no-shadows z-40">
<div class="flex items-center gap-4">
<h2 class="font-headline font-bold text-xl tracking-tighter text-on-surface">Active Session: Project Phoenix</h2>
<span class="bg-secondary-container text-on-secondary-container font-label text-xs uppercase tracking-widest px-2 py-1 rounded-sm">Validating</span>
</div>
<div class="flex items-center gap-4">
<!-- Mode Selector -->
<div class="flex bg-surface-container-highest rounded-lg p-1">
<button class="px-4 py-1.5 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Quick Riff</button>
<button class="px-4 py-1.5 rounded-md text-sm font-medium bg-surface-container-lowest text-primary shadow-[0px_4px_12px_rgba(45,51,55,0.04)] transition-all">Full Brainstorm</button>
<button class="px-4 py-1.5 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Critique</button>
</div>
<div class="h-6 w-[1px] bg-outline-variant opacity-30"></div>
<button class="text-[#5148d8] dark:text-[#5148d8] hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-colors p-2 rounded-full cursor-pointer active:scale-95 transition-transform">
<span class="material-symbols-outlined">notifications</span>
</button>
<img alt="User profile" class="w-8 h-8 rounded-full object-cover" data-alt="professional headshot of a man with short hair and subtle smile against clean gray background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2eXtfGEpmbjy2glwG2KjMug4PfoqUEJajkl1ccKI-S2kzn9htW8M2DRSfEJTRD8AAy4qJWdb0n0QN7lDGZauU6WpYbNk3F4pych4RrW0fD8g4rt4Dlk_ocATne_QQwdMo6OVM16SaemyfIQjGEsWxilMmKcwEnPYAqsRgQALwekyRp89I28IS1w1JjgdsTc51ozGR0rqAVrZsbJ7VW3MILdM21f3YGcetSBsDkjm-TMvng1S3hstHjeL4NyOof7aoO2r2K8_faZo"/>
</div>
</header>
<!-- Two Column Layout -->
<div class="flex-1 flex overflow-hidden">
<!-- Timeline Canvas -->
<div class="flex-1 flex flex-col px-8 py-6 overflow-y-auto">
<div class="max-w-3xl w-full mx-auto space-y-8 pb-24">
<!-- Intro -->
<div class="text-center mb-12">
<h3 class="font-headline text-2xl tracking-tight text-on-surface mb-2">Addressing the Onboarding Drop-off</h3>
<p class="font-body text-on-surface-variant text-sm">Session started 10 minutes ago. Goal: Increase D1 retention by 15%.</p>
</div>
<!-- Kai Message -->
<div class="relative pl-6">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary rounded-full"></div>
<div class="flex items-center gap-3 mb-2">
<div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-headline text-xs font-bold">K</div>
<span class="font-body font-semibold text-sm text-on-surface">Kai</span>
<span class="font-label text-[10px] uppercase tracking-widest text-primary">Visionary</span>
<span class="text-xs text-on-surface-variant ml-auto">10:42 AM</span>
</div>
<div class="font-body text-on-surface text-base leading-relaxed pr-12 text-justify text-left">
                            We're treating onboarding like a manual instead of an initiation. What if we drop the tooltips entirely? Instead, let's start them in a "sandbox" mode where their first action creates tangible value immediately. Think of it less like learning to drive and more like playing an instrument—make noise first, refine later.
                        </div>
</div>
<!-- Nova Message -->
<div class="relative pl-6">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-secondary rounded-full"></div>
<div class="flex items-center gap-3 mb-2">
<div class="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white font-headline text-xs font-bold">N</div>
<span class="font-body font-semibold text-sm text-on-surface">Nova</span>
<span class="font-label text-[10px] uppercase tracking-widest text-secondary">Strategist</span>
<span class="text-xs text-on-surface-variant ml-auto">10:45 AM</span>
</div>
<div class="font-body text-on-surface text-base leading-relaxed pr-12 text-justify text-left">
                            Strategically, a sandbox aligns with our "time-to-value" metric. If we can get them to experience a 'win' within the first 60 seconds, retention historically jumps. We should focus the sandbox on the 'Project Creation' flow, as that's our core retention hook.
                        </div>
</div>
<!-- Sage Message -->
<div class="relative pl-6">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-error rounded-full"></div>
<div class="flex items-center gap-3 mb-2">
<div class="w-6 h-6 rounded-full bg-error flex items-center justify-center text-white font-headline text-xs font-bold">S</div>
<span class="font-body font-semibold text-sm text-on-surface">Sage</span>
<span class="font-label text-[10px] uppercase tracking-widest text-error">Critic</span>
<span class="text-xs text-on-surface-variant ml-auto">10:47 AM</span>
</div>
<div class="font-body text-on-surface text-base leading-relaxed pr-12 text-justify text-left">
                            A sandbox sounds great until they try to do real work and realize they don't know where the actual tools are. If we remove tooltips, we risk alienating less tech-savvy users who need explicit guidance. We can't assume intuition over instruction for B2B tools.
                        </div>
</div>
<!-- Rex Message -->
<div class="relative pl-6">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-tertiary rounded-full"></div>
<div class="flex items-center gap-3 mb-2">
<div class="w-6 h-6 rounded-full bg-tertiary flex items-center justify-center text-white font-headline text-xs font-bold">R</div>
<span class="font-body font-semibold text-sm text-on-surface">Rex</span>
<span class="font-label text-[10px] uppercase tracking-widest text-tertiary">Builder</span>
<span class="text-xs text-on-surface-variant ml-auto">10:50 AM</span>
</div>
<div class="font-body text-on-surface text-base leading-relaxed pr-12 text-justify text-left">
                            Technically, building an isolated sandbox environment is a heavy lift for Q3. What if instead of a separate environment, we use "Guided Templates"? They drop into a pre-populated project where the first 3 actions are highly constrained but use the real UI. It's cheaper to build and solves Sage's concern about tool discovery.
                        </div>
</div>
</div>
</div>
<!-- Contextual Actions Overlay (Bottom Center) -->
<div class="absolute bottom-8 left-[calc(50%+8rem)] -translate-x-1/2 glass-panel px-6 py-4 rounded-xl shadow-[0px_12px_32px_rgba(45,51,55,0.06)] border border-outline-variant/15 flex items-center gap-4 z-30">
<div class="relative w-full max-w-lg flex items-center">
<span class="material-symbols-outlined absolute left-3 text-on-surface-variant">chat</span>
<input class="w-full bg-surface-container-highest border-none rounded-lg pl-10 pr-4 py-2.5 text-sm font-body focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant" placeholder="Add your thought or direct a persona..." type="text"/>
</div>
<div class="h-8 w-[1px] bg-outline-variant opacity-30 mx-2"></div>
<button class="btn-gradient text-white rounded-lg py-2 px-4 font-body font-medium text-sm whitespace-nowrap shadow-sm hover:opacity-90 transition-opacity">
                    Next Persona Round
                </button>
</div>
<!-- Side Panel (Summary & Output) -->
<aside class="w-80 bg-surface-container-low border-l border-surface-container-highest/50 flex flex-col z-20">
<div class="p-6 border-b border-outline-variant/10">
<h4 class="font-headline font-bold text-lg text-on-surface mb-1">Session Synthesis</h4>
<p class="font-body text-xs text-on-surface-variant">Real-time thematic extraction</p>
</div>
<div class="flex-1 overflow-y-auto p-6 space-y-6">
<!-- Insight Card -->
<div class="bg-surface-container-lowest rounded-xl p-4 shadow-[0px_4px_12px_rgba(45,51,55,0.02)]">
<div class="flex justify-between items-start mb-3">
<span class="font-label text-[10px] uppercase tracking-widest text-primary font-semibold">Leading Concept</span>
<span class="material-symbols-outlined text-outline-variant text-sm cursor-pointer hover:text-primary">push_pin</span>
</div>
<h5 class="font-body font-semibold text-sm text-on-surface mb-2">Guided Templates &gt; Blank Sandbox</h5>
<p class="font-body text-xs text-on-surface-variant leading-relaxed">
                            Consensus leaning away from isolated environments due to eng effort and discovery risks. Pre-populated templates win on cost and immediate value delivery.
                        </p>
</div>
<!-- Alignment Score -->
<div class="bg-surface-container-lowest rounded-xl p-4 shadow-[0px_4px_12px_rgba(45,51,55,0.02)]">
<span class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold mb-3 block">Alignment Score</span>
<div class="flex items-end gap-2 mb-2">
<span class="font-headline font-bold text-3xl text-on-surface leading-none">72</span>
<span class="font-body text-xs text-on-surface-variant pb-1">/ 100</span>
</div>
<div class="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
<div class="bg-tertiary-container h-full w-[72%] rounded-full"></div>
</div>
<p class="font-body text-[10px] text-on-surface-variant mt-2 italic">Visionary and Critic currently misaligned on execution.</p>
</div>
<!-- Personas Active -->
<div>
<span class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold mb-3 block">Voices in Room</span>
<div class="flex flex-wrap gap-2">
<div class="px-2 py-1 rounded-sm bg-surface-container-lowest border border-primary/20 flex items-center gap-1.5">
<div class="w-2 h-2 rounded-full bg-primary"></div>
<span class="font-body text-xs text-on-surface">Kai</span>
</div>
<div class="px-2 py-1 rounded-sm bg-surface-container-lowest border border-secondary/20 flex items-center gap-1.5">
<div class="w-2 h-2 rounded-full bg-secondary"></div>
<span class="font-body text-xs text-on-surface">Nova</span>
</div>
<div class="px-2 py-1 rounded-sm bg-surface-container-lowest border border-error/20 flex items-center gap-1.5">
<div class="w-2 h-2 rounded-full bg-error"></div>
<span class="font-body text-xs text-on-surface">Sage</span>
</div>
<div class="px-2 py-1 rounded-sm bg-surface-container-lowest border border-tertiary/20 flex items-center gap-1.5">
<div class="w-2 h-2 rounded-full bg-tertiary"></div>
<span class="font-body text-xs text-on-surface">Rex</span>
</div>
<div class="px-2 py-1 rounded-sm bg-surface border border-outline-variant/20 flex items-center gap-1.5 opacity-50">
<div class="w-2 h-2 rounded-full bg-primary-container"></div>
<span class="font-body text-xs text-on-surface-variant">Luna</span>
</div>
</div>
</div>
</div>
<div class="p-6 border-t border-outline-variant/10 bg-surface-container-low">
<button class="w-full bg-transparent border border-outline-variant/15 text-primary rounded-lg py-2.5 px-4 font-body font-medium text-sm hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined" style="font-size: 18px;">summarize</span>
                        Generate Summary
                    </button>
</div>
</aside>
</div>
</main>
</body></html>

<!-- Brainstorming Session -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Resource Vault - Roundtable OS</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "tertiary-container": "#c7abff",
                        "on-error-container": "#68001f",
                        "surface-tint": "#5148d8",
                        "surface-container": "#eaeef1",
                        "on-secondary-fixed": "#004e47",
                        "primary-fixed-dim": "#aeabff",
                        "primary-container": "#bdbaff",
                        "surface": "#f7f9fb",
                        "on-secondary-fixed-variant": "#006d64",
                        "on-primary": "#fbf7ff",
                        "surface-container-highest": "#dde3e7",
                        "error-dim": "#770326",
                        "on-tertiary-container": "#46009d",
                        "on-tertiary": "#fdf7ff",
                        "secondary-fixed": "#91feef",
                        "surface-container-low": "#f1f4f6",
                        "outline": "#757c7f",
                        "primary": "#5148d8",
                        "surface-bright": "#f7f9fb",
                        "tertiary-dim": "#681ad9",
                        "primary-dim": "#453acc",
                        "error-container": "#f76a80",
                        "on-surface-variant": "#596063",
                        "on-surface": "#2d3337",
                        "secondary-dim": "#005e56",
                        "tertiary-fixed": "#c7abff",
                        "on-tertiary-fixed": "#2b0066",
                        "tertiary": "#742fe5",
                        "on-primary-fixed-variant": "#3628be",
                        "inverse-on-surface": "#9a9d9f",
                        "on-secondary-container": "#006259",
                        "secondary": "#006b62",
                        "surface-variant": "#dde3e7",
                        "on-primary-container": "#2c18b6",
                        "error": "#ac3149",
                        "background": "#f7f9fb",
                        "on-error": "#fff7f7",
                        "primary-fixed": "#bdbaff",
                        "on-background": "#2d3337",
                        "surface-container-lowest": "#ffffff",
                        "on-secondary": "#e2fff9",
                        "surface-dim": "#d3dbdf",
                        "outline-variant": "#acb3b7",
                        "surface-container-high": "#e3e9ec",
                        "inverse-surface": "#0b0f10",
                        "tertiary-fixed-dim": "#bb9aff",
                        "secondary-container": "#91feef",
                        "on-primary-fixed": "#19008c",
                        "secondary-fixed-dim": "#83efe1",
                        "on-tertiary-fixed-variant": "#5100b3",
                        "inverse-primary": "#8681ff"
                    },
                    borderRadius: {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    fontFamily: {
                        "headline": ["Manrope", "sans-serif"],
                        "body": ["Inter", "sans-serif"],
                        "label": ["Inter", "sans-serif"]
                    }
                }
            }
        }
    </script>
<style>
        .glass-panel {
            background: rgba(247, 249, 251, 0.7);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        }
        .btn-gradient {
            background: linear-gradient(135deg, #5148d8 0%, #453acc 100%);
        }
        .ambient-shadow {
            box-shadow: 0px 12px 32px rgba(45, 51, 55, 0.06);
        }
        .ghost-border {
            border: 1px solid rgba(172, 179, 183, 0.15);
        }
    </style>
</head>
<body class="bg-surface text-on-surface font-body antialiased flex h-screen overflow-hidden">
<!-- SideNavBar (Web) -->
<nav class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-[#f1f4f6] dark:bg-slate-900 p-4 gap-2 z-50">
<!-- Header -->
<div class="mb-8 px-4 flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-white text-sm" style="font-variation-settings: 'FILL' 1;">apps</span>
</div>
<div>
<h1 class="font-['Manrope'] font-extrabold text-lg text-[#5148d8] tracking-tight">Roundtable OS</h1>
<p class="text-xs text-on-surface-variant font-medium">Editorial Engine</p>
</div>
</div>
<!-- CTA -->
<div class="px-2 mb-6">
<button class="w-full btn-gradient text-white rounded-lg py-3 px-4 font-medium text-sm flex items-center justify-center gap-2 transition-transform active:scale-95">
<span class="material-symbols-outlined text-[18px]">add</span>
                New Spark
            </button>
</div>
<!-- Navigation Links -->
<div class="flex-1 flex flex-col gap-1 overflow-y-auto">
<a class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined text-[20px]">dashboard</span>
                Dashboard
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined text-[20px]">lightbulb</span>
                Ideas
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined text-[20px]">psychology</span>
                Brainstorming
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#5148d8] bg-white dark:bg-slate-800 shadow-[0px_12px_32px_rgba(45,51,55,0.06)] transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined text-[20px]">inventory_2</span>
                Resource Vault
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined text-[20px]">checklist</span>
                Task Manager
            </a>
<a class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined text-[20px]">settings</span>
                Settings
            </a>
</div>
<!-- Footer Links -->
<div class="mt-auto pt-4 border-t border-transparent">
<a class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#757c7f] hover:text-[#2d3337] dark:hover:text-white hover:bg-[#e3e9ec] dark:hover:bg-slate-800 transition-all duration-200 ease-in-out font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined text-[20px]">help</span>
                Help Center
            </a>
</div>
</nav>
<!-- Main Content Area -->
<main class="flex-1 md:ml-64 h-full flex flex-col bg-surface relative">
<!-- TopNavBar (Mobile only for this context, but acting as page header on desktop) -->
<header class="flex justify-between items-center w-full px-6 py-6 lg:py-8 bg-surface shrink-0 z-40">
<div>
<h2 class="font-headline font-bold text-3xl tracking-tight text-on-surface">Resource Vault</h2>
<p class="text-on-surface-variant text-sm mt-1">Manage and discover essential assets across the OS.</p>
</div>
<div class="flex items-center gap-4">
<div class="hidden sm:flex items-center bg-surface-container-low rounded-full px-4 py-2">
<span class="material-symbols-outlined text-outline text-[20px] mr-2">search</span>
<input class="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder-outline text-on-surface p-0" placeholder="Search resources..." type="text"/>
</div>
<button class="w-10 h-10 rounded-full flex items-center justify-center text-outline hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined">filter_list</span>
</button>
<button class="btn-gradient text-white rounded-lg px-5 py-2.5 font-medium text-sm flex items-center gap-2 shadow-[0px_4px_12px_rgba(81,72,216,0.2)] transition-transform active:scale-95">
<span class="material-symbols-outlined text-[18px]">add</span>
<span class="hidden sm:inline">Add Resource</span>
</button>
</div>
</header>
<!-- View Controls & Filters -->
<div class="px-6 pb-6 flex flex-wrap items-center justify-between gap-4 shrink-0">
<div class="flex items-center gap-2 bg-surface-container-low p-1 rounded-lg">
<button class="px-3 py-1.5 rounded bg-surface-container-lowest text-primary shadow-sm text-sm font-medium flex items-center gap-1.5">
<span class="material-symbols-outlined text-[18px]">grid_view</span>
                    Cards
                </button>
<button class="px-3 py-1.5 rounded text-outline hover:text-on-surface text-sm font-medium flex items-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[18px]">table_rows</span>
                    List
                </button>
</div>
<div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
<span class="text-xs font-semibold text-outline uppercase tracking-wider mr-2">Filters</span>
<button class="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-medium whitespace-nowrap">All Items</button>
<button class="px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high text-xs font-medium whitespace-nowrap transition-colors">AI Models</button>
<button class="px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high text-xs font-medium whitespace-nowrap transition-colors">Documentation</button>
<button class="px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high text-xs font-medium whitespace-nowrap transition-colors">Design Assets</button>
<button class="px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high text-xs font-medium whitespace-nowrap transition-colors">Tools</button>
</div>
</div>
<!-- Scrollable Content Canvas -->
<div class="flex-1 overflow-y-auto px-6 pb-24">
<!-- Cards Grid View -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
<!-- Card 1: AI Model -->
<div class="bg-surface-container-lowest rounded-xl p-5 ambient-shadow hover:-translate-y-1 transition-transform duration-300 group flex flex-col h-full cursor-pointer relative overflow-hidden">
<div class="absolute top-0 left-0 w-full h-1 bg-primary"></div>
<div class="flex justify-between items-start mb-4">
<div class="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-primary text-[24px]">smart_toy</span>
</div>
<span class="px-2.5 py-1 bg-surface-container-low text-outline text-[10px] font-bold uppercase tracking-wider rounded-md">AI Model</span>
</div>
<h3 class="font-body font-semibold text-on-surface text-lg mb-1 leading-tight group-hover:text-primary transition-colors">GPT-4 Turbo Architecture</h3>
<p class="text-on-surface-variant text-sm line-clamp-2 mb-4 flex-1">Technical specifications and prompting guidelines for integrating the latest LLM.</p>
<div class="flex flex-wrap gap-1.5 mb-4 mt-auto">
<span class="px-2 py-0.5 border border-outline-variant/30 rounded text-xs text-on-surface-variant">Core</span>
<span class="px-2 py-0.5 border border-outline-variant/30 rounded text-xs text-on-surface-variant">API</span>
</div>
<div class="flex items-center justify-between pt-4 border-t border-surface-container-low">
<div class="flex items-center gap-1.5 text-xs text-secondary font-medium">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
                            Active
                        </div>
<span class="material-symbols-outlined text-outline group-hover:text-primary text-[20px] transition-colors">arrow_forward</span>
</div>
</div>
<!-- Card 2: Documentation -->
<div class="bg-surface-container-lowest rounded-xl p-5 ambient-shadow hover:-translate-y-1 transition-transform duration-300 group flex flex-col h-full cursor-pointer relative overflow-hidden">
<div class="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
<div class="flex justify-between items-start mb-4">
<div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-secondary text-[24px]">menu_book</span>
</div>
<span class="px-2.5 py-1 bg-surface-container-low text-outline text-[10px] font-bold uppercase tracking-wider rounded-md">Book</span>
</div>
<h3 class="font-body font-semibold text-on-surface text-lg mb-1 leading-tight group-hover:text-secondary transition-colors">The Design of Everyday Things</h3>
<p class="text-on-surface-variant text-sm line-clamp-2 mb-4 flex-1">Don Norman's definitive guide to human-centered design principles.</p>
<div class="flex flex-wrap gap-1.5 mb-4 mt-auto">
<span class="px-2 py-0.5 border border-outline-variant/30 rounded text-xs text-on-surface-variant">UX</span>
<span class="px-2 py-0.5 border border-outline-variant/30 rounded text-xs text-on-surface-variant">Theory</span>
</div>
<div class="flex items-center justify-between pt-4 border-t border-surface-container-low">
<div class="flex items-center gap-1.5 text-xs text-outline font-medium">
<span class="w-2 h-2 rounded-full bg-outline"></span>
                            Reference
                        </div>
<span class="material-symbols-outlined text-outline group-hover:text-secondary text-[20px] transition-colors">arrow_forward</span>
</div>
</div>
<!-- Card 3: Video -->
<div class="bg-surface-container-lowest rounded-xl p-5 ambient-shadow hover:-translate-y-1 transition-transform duration-300 group flex flex-col h-full cursor-pointer relative overflow-hidden">
<div class="absolute top-0 left-0 w-full h-1 bg-tertiary"></div>
<div class="flex justify-between items-start mb-4">
<div class="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-tertiary text-[24px]">play_circle</span>
</div>
<span class="px-2.5 py-1 bg-surface-container-low text-outline text-[10px] font-bold uppercase tracking-wider rounded-md">Video</span>
</div>
<h3 class="font-body font-semibold text-on-surface text-lg mb-1 leading-tight group-hover:text-tertiary transition-colors">Advanced CSS Grid Layouts</h3>
<p class="text-on-surface-variant text-sm line-clamp-2 mb-4 flex-1">Masterclass on building asymmetric, magazine-style layouts for web.</p>
<div class="flex flex-wrap gap-1.5 mb-4 mt-auto">
<span class="px-2 py-0.5 border border-outline-variant/30 rounded text-xs text-on-surface-variant">Frontend</span>
<span class="px-2 py-0.5 border border-outline-variant/30 rounded text-xs text-on-surface-variant">Tutorial</span>
</div>
<div class="flex items-center justify-between pt-4 border-t border-surface-container-low">
<div class="flex items-center gap-1.5 text-xs text-secondary font-medium">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
                            In Progress
                        </div>
<span class="material-symbols-outlined text-outline group-hover:text-tertiary text-[20px] transition-colors">arrow_forward</span>
</div>
</div>
<!-- Card 4: App -->
<div class="bg-surface-container-lowest rounded-xl p-5 ambient-shadow hover:-translate-y-1 transition-transform duration-300 group flex flex-col h-full cursor-pointer relative overflow-hidden">
<div class="absolute top-0 left-0 w-full h-1 bg-outline"></div>
<div class="flex justify-between items-start mb-4">
<div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-on-surface text-[24px]">web</span>
</div>
<span class="px-2.5 py-1 bg-surface-container-low text-outline text-[10px] font-bold uppercase tracking-wider rounded-md">App</span>
</div>
<h3 class="font-body font-semibold text-on-surface text-lg mb-1 leading-tight group-hover:text-primary transition-colors">Figma Design System</h3>
<p class="text-on-surface-variant text-sm line-clamp-2 mb-4 flex-1">The master component library and visual tokens for Roundtable OS.</p>
<div class="flex flex-wrap gap-1.5 mb-4 mt-auto">
<span class="px-2 py-0.5 border border-outline-variant/30 rounded text-xs text-on-surface-variant">Design</span>
<span class="px-2 py-0.5 border border-outline-variant/30 rounded text-xs text-on-surface-variant">UI/UX</span>
</div>
<div class="flex items-center justify-between pt-4 border-t border-surface-container-low">
<div class="flex items-center gap-1.5 text-xs text-secondary font-medium">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
                            Active
                        </div>
<span class="material-symbols-outlined text-outline group-hover:text-primary text-[20px] transition-colors">arrow_forward</span>
</div>
</div>
</div>
</div>
</main>
</body></html>

<!-- Resource Vault -->
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Roundtable OS Task Manager</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "tertiary-container": "#c7abff",
                        "on-error-container": "#68001f",
                        "surface-tint": "#5148d8",
                        "surface-container": "#eaeef1",
                        "on-secondary-fixed": "#004e47",
                        "primary-fixed-dim": "#aeabff",
                        "primary-container": "#bdbaff",
                        "surface": "#f7f9fb",
                        "on-secondary-fixed-variant": "#006d64",
                        "on-primary": "#fbf7ff",
                        "surface-container-highest": "#dde3e7",
                        "error-dim": "#770326",
                        "on-tertiary-container": "#46009d",
                        "on-tertiary": "#fdf7ff",
                        "secondary-fixed": "#91feef",
                        "surface-container-low": "#f1f4f6",
                        "outline": "#757c7f",
                        "primary": "#5148d8",
                        "surface-bright": "#f7f9fb",
                        "tertiary-dim": "#681ad9",
                        "primary-dim": "#453acc",
                        "error-container": "#f76a80",
                        "on-surface-variant": "#596063",
                        "on-surface": "#2d3337",
                        "secondary-dim": "#005e56",
                        "tertiary-fixed": "#c7abff",
                        "on-tertiary-fixed": "#2b0066",
                        "tertiary": "#742fe5",
                        "on-primary-fixed-variant": "#3628be",
                        "inverse-on-surface": "#9a9d9f",
                        "on-secondary-container": "#006259",
                        "secondary": "#006b62",
                        "surface-variant": "#dde3e7",
                        "on-primary-container": "#2c18b6",
                        "error": "#ac3149",
                        "background": "#f7f9fb",
                        "on-error": "#fff7f7",
                        "primary-fixed": "#bdbaff",
                        "on-background": "#2d3337",
                        "surface-container-lowest": "#ffffff",
                        "on-secondary": "#e2fff9",
                        "surface-dim": "#d3dbdf",
                        "outline-variant": "#acb3b7",
                        "surface-container-high": "#e3e9ec",
                        "inverse-surface": "#0b0f10",
                        "tertiary-fixed-dim": "#bb9aff",
                        "secondary-container": "#91feef",
                        "on-primary-fixed": "#19008c",
                        "secondary-fixed-dim": "#83efe1",
                        "on-tertiary-fixed-variant": "#5100b3",
                        "inverse-primary": "#8681ff"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {},
                    "fontFamily": {
                        "headline": ["Manrope"],
                        "body": ["Inter"],
                        "label": ["Inter"]
                    }
                },
            },
        }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; background-color: #f7f9fb; color: #2d3337; margin: 0; padding: 0; height: 100vh; display: flex; flex-direction: column; overflow: hidden;}
        h1, h2, h3, h4, h5, h6, .font-headline { font-family: 'Manrope', sans-serif; }
        .glass-panel { background: rgba(247, 249, 251, 0.8); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }
        .ghost-border { border: 1px solid rgba(172, 179, 183, 0.15); }
        .ambient-shadow { box-shadow: 0px 12px 32px rgba(45, 51, 55, 0.06); }
        .gradient-text { background: linear-gradient(135deg, #5148d8, #453acc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-surface text-on-surface antialiased flex flex-row">
<!-- SideNavBar -->
<aside class="h-screen w-64 fixed left-0 top-0 bg-surface-container-low hidden md:flex flex-col p-4 gap-2 no-border tonal-shift flat">
<div class="mb-8 px-2 flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline font-bold">R</div>
<div>
<div class="font-headline font-extrabold text-lg text-primary tracking-tighter">Roundtable OS</div>
<div class="font-body text-xs text-on-surface-variant">Editorial Engine</div>
</div>
</div>
<nav class="flex-1 flex flex-col gap-1">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 ease-in-out font-body font-medium text-sm group" href="#">
<span class="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface transition-colors">dashboard</span>
<span class="group-hover:text-on-surface transition-colors">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 ease-in-out font-body font-medium text-sm group" href="#">
<span class="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface transition-colors">lightbulb</span>
<span class="group-hover:text-on-surface transition-colors">Ideas</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 ease-in-out font-body font-medium text-sm group" href="#">
<span class="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface transition-colors">psychology</span>
<span class="group-hover:text-on-surface transition-colors">Brainstorming</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 ease-in-out font-body font-medium text-sm group" href="#">
<span class="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface transition-colors">inventory_2</span>
<span class="group-hover:text-on-surface transition-colors">Resource Vault</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary bg-surface-container-lowest shadow-[0px_12px_32px_rgba(45,51,55,0.06)] font-body font-medium text-sm transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">checklist</span>
<span>Task Manager</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 ease-in-out font-body font-medium text-sm group" href="#">
<span class="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface transition-colors">settings</span>
<span class="group-hover:text-on-surface transition-colors">Settings</span>
</a>
</nav>
<div class="mt-auto flex flex-col gap-4">
<button class="w-full py-2.5 rounded-md text-on-primary font-body font-medium text-sm bg-gradient-to-br from-primary to-primary-dim hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm">
<span class="material-symbols-outlined text-[18px]">add</span>
                New Spark
            </button>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 ease-in-out font-body font-medium text-sm group" href="#">
<span class="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface transition-colors">help</span>
<span class="group-hover:text-on-surface transition-colors">Help Center</span>
</a>
</div>
</aside>
<!-- Main Content Area -->
<main class="flex-1 flex flex-col ml-0 md:ml-64 h-full bg-surface overflow-hidden">
<!-- TopNavBar (Mobile Only) -->
<header class="md:hidden flex justify-between items-center w-full px-6 py-3 bg-surface border-b border-surface-container-highest">
<div class="font-headline font-bold text-xl tracking-tighter text-on-surface">Roundtable OS</div>
<div class="flex items-center gap-4 text-primary">
<span class="material-symbols-outlined cursor-pointer hover:bg-surface-container-high rounded-full p-1 transition-colors">notifications</span>
<img alt="User profile" class="w-8 h-8 rounded-full border border-surface-container-highest cursor-pointer" data-alt="close up portrait of a young professional woman with dark hair in a well-lit office environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAewNjRCPOokcTpPBmlBqe0-8BayxDljkBHhGsO5flcEKGddJjQ8OyUSajOAwgoaIXVqOpmC7OFieERDuaHB9hWtIls82-rZbPRAQSVgfi1ZHS45nZRXs4qDO_WPWrYHEbKkcejCUV27uVtItBi9nTzm1yOS81tfiWAJ1PPjheLZ_kLxYCFlm-4nLWFd7v1zaxAsZGLiueq0qpdfj_SN_FAZNlcKQ62uHxC4LSG0KP6jJWVcif0iA5U0lE9VdWyCUrRl56iMmDx0-o"/>
</div>
</header>
<!-- Header Content -->
<div class="px-8 py-6 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<h1 class="font-headline font-bold text-3xl tracking-tight text-on-surface mb-1">Task Manager</h1>
<p class="font-body text-sm text-on-surface-variant">Track execution across all active sparks.</p>
</div>
<div class="flex items-center gap-3">
<div class="relative hidden sm:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
<input class="pl-9 pr-4 py-2 bg-surface-container-highest focus:bg-surface-container-lowest focus:ring-0 ghost-border rounded-lg text-sm font-body w-48 transition-colors outline-none text-on-surface placeholder-outline-variant" placeholder="Filter tasks..." type="text"/>
</div>
<button class="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-md font-body text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
<span class="material-symbols-outlined text-[18px]">add_task</span>
                    Create Task
                </button>
</div>
</div>
<!-- Filters Strip -->
<div class="px-8 pb-4 shrink-0 flex gap-2 overflow-x-auto hide-scrollbar">
<button class="px-3 py-1.5 rounded-full bg-surface-container-lowest ghost-border text-sm font-body text-on-surface flex items-center gap-1.5 whitespace-nowrap hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-[16px] text-outline">filter_list</span>
                All Ideas
            </button>
<button class="px-3 py-1.5 rounded-full bg-surface-container-lowest ghost-border text-sm font-body text-on-surface flex items-center gap-1.5 whitespace-nowrap hover:bg-surface-container-low transition-colors">
<span class="w-5 h-5 rounded-full bg-primary-container text-primary text-[10px] flex items-center justify-center font-bold font-headline">K</span>
                Assignee: Kai
            </button>
<button class="px-3 py-1.5 rounded-full bg-surface-container-lowest ghost-border text-sm font-body text-on-surface flex items-center gap-1.5 whitespace-nowrap hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-[16px] text-outline">calendar_today</span>
                Due: This Week
            </button>
</div>
<!-- Kanban Board -->
<div class="flex-1 overflow-x-auto overflow-y-hidden hide-scrollbar px-8 pb-8 flex gap-6">
<!-- Todo Column -->
<div class="w-80 shrink-0 flex flex-col gap-4 h-full">
<div class="flex items-center justify-between">
<h3 class="font-headline font-semibold text-sm text-on-surface-variant tracking-wide uppercase">Todo <span class="ml-2 text-outline font-body font-normal normal-case">3</span></h3>
<button class="material-symbols-outlined text-outline hover:text-on-surface transition-colors text-[20px]">add</button>
</div>
<div class="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-3 pb-4">
<!-- Task Card 1 -->
<div class="bg-surface-container-lowest rounded-xl p-4 ambient-shadow flex flex-col gap-3 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform duration-200">
<div class="flex justify-between items-start gap-2">
<span class="px-2 py-0.5 rounded text-[10px] font-label font-medium uppercase tracking-wider bg-primary-container text-primary">Content Hub</span>
<span class="material-symbols-outlined text-outline text-[16px] cursor-pointer hover:text-on-surface">more_horiz</span>
</div>
<h4 class="font-body font-medium text-sm text-on-surface leading-snug">Draft initial taxonomy for knowledge base</h4>
<div class="flex items-center justify-between mt-1">
<div class="flex items-center gap-1.5 text-xs font-label text-outline">
<span class="material-symbols-outlined text-[14px]">calendar_today</span>
                                Oct 24
                            </div>
<div class="w-6 h-6 rounded-full bg-tertiary-container flex items-center justify-center text-tertiary text-[10px] font-headline font-bold" title="Rex">R</div>
</div>
</div>
<!-- Task Card 2 -->
<div class="bg-surface-container-lowest rounded-xl p-4 ambient-shadow flex flex-col gap-3 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform duration-200">
<div class="flex justify-between items-start gap-2">
<span class="px-2 py-0.5 rounded text-[10px] font-label font-medium uppercase tracking-wider bg-secondary-container text-secondary">Q4 Campaign</span>
<span class="material-symbols-outlined text-outline text-[16px] cursor-pointer hover:text-on-surface">more_horiz</span>
</div>
<h4 class="font-body font-medium text-sm text-on-surface leading-snug">Review competitor ad copy variations</h4>
<div class="flex items-center justify-between mt-1">
<div class="flex items-center gap-1.5 text-xs font-label text-error">
<span class="material-symbols-outlined text-[14px]">calendar_today</span>
                                Oct 20
                            </div>
<div class="w-6 h-6 rounded-full bg-error-container flex items-center justify-center text-on-error-container text-[10px] font-headline font-bold" title="Sage">S</div>
</div>
</div>
</div>
</div>
<!-- In Progress Column -->
<div class="w-80 shrink-0 flex flex-col gap-4 h-full">
<div class="flex items-center justify-between">
<h3 class="font-headline font-semibold text-sm text-on-surface-variant tracking-wide uppercase">In Progress <span class="ml-2 text-outline font-body font-normal normal-case">2</span></h3>
<button class="material-symbols-outlined text-outline hover:text-on-surface transition-colors text-[20px]">add</button>
</div>
<div class="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-3 pb-4">
<!-- Task Card 3 -->
<div class="bg-surface-container-lowest rounded-xl p-4 ambient-shadow border-l-2 border-primary flex flex-col gap-3 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform duration-200">
<div class="flex justify-between items-start gap-2">
<span class="px-2 py-0.5 rounded text-[10px] font-label font-medium uppercase tracking-wider bg-primary-container text-primary">Content Hub</span>
<span class="material-symbols-outlined text-outline text-[16px] cursor-pointer hover:text-on-surface">more_horiz</span>
</div>
<h4 class="font-body font-medium text-sm text-on-surface leading-snug">Design wireframes for article detail view</h4>
<div class="flex items-center justify-between mt-1">
<div class="flex items-center gap-1.5 text-xs font-label text-outline">
<span class="material-symbols-outlined text-[14px]">calendar_today</span>
                                Oct 26
                            </div>
<img alt="Assignee" class="w-6 h-6 rounded-full border border-surface-container-highest" data-alt="close up portrait of a young professional woman with dark hair in a well-lit office environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-Rv7e1NAw9YdNxqneikkGSM-1GGx0rNWGdv2PNHTEVXb2BVeSos_rXbq8LuwgNkL6PErJnKd7u4FdaFVnT0rhM6iYFF-wpPvC1oxoV-JHJmDJ6TnIDochFjATrVKn_i99Pgbw821FBfHoq4itJyNqRmg3O5F_cp4Ky_tzrr72RolO-saGbjkaIXLovIl2Ga8f_qO4Gw7Xqy4nuK4lbHpJHkD098PTeZ8zDX3zApaOkG3g5wbq-Fc0lKG7rS3jfaWCecVUeHLwCY8"/>
</div>
</div>
</div>
</div>
<!-- Blocked Column -->
<div class="w-80 shrink-0 flex flex-col gap-4 h-full">
<div class="flex items-center justify-between">
<h3 class="font-headline font-semibold text-sm text-error-dim tracking-wide uppercase">Blocked <span class="ml-2 text-outline font-body font-normal normal-case">1</span></h3>
<button class="material-symbols-outlined text-outline hover:text-on-surface transition-colors text-[20px]">add</button>
</div>
<div class="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-3 pb-4">
<!-- Task Card 4 -->
<div class="bg-surface-container-lowest rounded-xl p-4 ambient-shadow border-l-2 border-error flex flex-col gap-3 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform duration-200 opacity-80">
<div class="flex justify-between items-start gap-2">
<span class="px-2 py-0.5 rounded text-[10px] font-label font-medium uppercase tracking-wider bg-tertiary-container text-tertiary">API Integrations</span>
<span class="material-symbols-outlined text-outline text-[16px] cursor-pointer hover:text-on-surface">more_horiz</span>
</div>
<h4 class="font-body font-medium text-sm text-on-surface leading-snug line-through text-on-surface-variant">Establish OAuth flow with external provider</h4>
<div class="text-xs text-error font-body italic flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">warning</span>
                            Waiting on compliance approval
                        </div>
<div class="flex items-center justify-between mt-1">
<div class="flex items-center gap-1.5 text-xs font-label text-outline">
<span class="material-symbols-outlined text-[14px]">calendar_today</span>
                                Oct 22
                            </div>
<div class="w-6 h-6 rounded-full bg-outline-variant flex items-center justify-center text-on-surface text-[10px] font-headline font-bold" title="Nia">N</div>
</div>
</div>
</div>
</div>
<!-- Done Column -->
<div class="w-80 shrink-0 flex flex-col gap-4 h-full">
<div class="flex items-center justify-between">
<h3 class="font-headline font-semibold text-sm text-on-surface-variant tracking-wide uppercase">Done <span class="ml-2 text-outline font-body font-normal normal-case">5+</span></h3>
<button class="material-symbols-outlined text-outline hover:text-on-surface transition-colors text-[20px]">add</button>
</div>
<div class="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-3 pb-4">
<!-- Task Card 5 -->
<div class="bg-surface-container-lowest rounded-xl p-4 ghost-border flex flex-col gap-3 opacity-60">
<div class="flex justify-between items-start gap-2">
<span class="px-2 py-0.5 rounded text-[10px] font-label font-medium uppercase tracking-wider bg-surface-variant text-on-surface-variant">Onboarding</span>
<span class="material-symbols-outlined text-outline text-[16px] cursor-pointer hover:text-on-surface">more_horiz</span>
</div>
<h4 class="font-body font-medium text-sm text-on-surface leading-snug line-through">Finalize welcome email sequence</h4>
<div class="flex items-center justify-between mt-1">
<div class="flex items-center gap-1.5 text-xs font-label text-outline">
<span class="material-symbols-outlined text-[14px] text-secondary">check_circle</span>
                                Oct 18
                            </div>
<div class="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center text-secondary text-[10px] font-headline font-bold" title="Nova">N</div>
</div>
</div>
</div>
</div>
</div>
</main>
</body></html>