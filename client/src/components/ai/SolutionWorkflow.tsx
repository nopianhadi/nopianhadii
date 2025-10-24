import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle2, 
  Play,
  Settings,
  TrendingUp,
  Users,
  Database,
  Zap,
  BarChart3
} from "lucide-react";

interface WorkflowStep {
  phase: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  deliverables: string[];
}

interface SolutionWorkflowProps {
  solutionType: string;
}

const workflowData: Record<string, WorkflowStep[]> = {
  "Dashboard Analytics": [
    {
      phase: "1",
      title: "Analisis Kebutuhan Data",
      description: "Kami akan identifikasi semua sumber data yang Anda punya saat ini (Excel spreadsheets, Google Sheets, database SQL, API pihak ketiga seperti marketplace/payment gateway, atau sistem legacy). Kami akan mapping data mana yang penting untuk decision making, bagaimana struktur datanya, dan berapa sering perlu di-update. Tujuannya: pastikan semua data yang critical untuk bisnis Anda bisa masuk dashboard dengan akurat.",
      duration: "1 minggu",
      icon: <Database className="w-5 h-5" />,
      deliverables: [
        "Dokumen requirement data lengkap (field apa saja yang perlu ditampilkan)",
        "List sumber data (Excel mana, database apa, API mana yang akan diintegrate)",
        "Data mapping diagram (visual flow data dari source sampai dashboard)",
        "Update frequency plan (data mana yang real-time, mana yang daily/weekly)"
      ]
    },
    {
      phase: "2", 
      title: "Design Dashboard & Visualisasi",
      description: "Berdasarkan requirement di fase 1, kami akan design mockup dashboard yang intuitive dan actionable. Kami akan pilih jenis chart yang paling cocok untuk setiap metrics (line chart untuk trend, bar chart untuk comparison, pie chart untuk composition, dll). Design akan fokus pada clarity dan usability - tidak overwhelming tapi informative. Anda bisa request revisi sampai 100% sesuai kebutuhan.",
      duration: "1-2 minggu",
      icon: <BarChart3 className="w-5 h-5" />,
      deliverables: [
        "Mockup design dashboard hi-fidelity (tampilan final dashboard Anda)",
        "Chart templates library (berbagai jenis visualisasi siap pakai)",
        "KPI definitions document (definisi jelas setiap metrics: rumus, satuan, target)",
        "Color coding system (merah untuk alert, hijau untuk good performance, dll)"
      ]
    },
    {
      phase: "3",
      title: "Development & Integrasi",
      description: "Ini fase coding utama. Kami akan build dashboard sesuai mockup, integrate semua data sources (bisa dari Excel via upload, database via direct connection, atau API via automated sync), dan setup data pipeline supaya data flow otomatis tanpa manual intervention. Dashboard akan responsive (bisa dibuka di laptop, tablet, HP) dan fast loading (optimized queries).",
      duration: "3-5 minggu",
      icon: <Settings className="w-5 h-5" />,
      deliverables: [
        "Working dashboard full-featured (semua charts, filters, drill-down berfungsi)",
        "Data pipeline automated (data dari sources masuk otomatis sesuai schedule)",
        "Auto-refresh setup (dashboard update sendiri setiap X menit tanpa perlu refresh browser)",
        "Export features (download report ke Excel/PDF kapan saja)",
        "User permission system (control siapa bisa lihat data apa)"
      ]
    },
    {
      phase: "4",
      title: "Testing & Training",
      description: "Quality assurance team akan test accuracy data dengan cross-check ke source asli, test performa dashboard di berbagai device dan browser, dan test edge cases (bagaimana kalau data null, bagaimana kalau data terlalu banyak, dll). Setelah bug-free, kami akan training team Anda cara baca dashboard, cara filter data, cara export report, dan cara troubleshoot common issues.",
      duration: "1 minggu",
      icon: <Users className="w-5 h-5" />,
      deliverables: [
        "Test results report (dokumentasi semua test yang dilakukan dan hasilnya)",
        "User manual interaktif (guide step-by-step dengan screenshot untuk setiap fitur)",
        "Training session 1-2 jam (hands-on dengan real data, bisa rekam untuk reference)",
        "FAQ document (jawaban untuk 20+ pertanyaan yang sering ditanya)"
      ]
    },
    {
      phase: "5",
      title: "Launch & Monitoring",
      description: "Dashboard akan di-deploy ke production server (AWS/Google Cloud dengan 99.9% uptime guarantee). Kami akan monitor performa dashboard minggu pertama untuk ensure stability, fix issues kalau ada, dan collect feedback dari users untuk potential improvements. Support team kami akan standby untuk assist kalau ada pertanyaan atau issues.",
      duration: "Ongoing",
      icon: <TrendingUp className="w-5 h-5" />,
      deliverables: [
        "Live dashboard URL (akses via browser dari mana saja dengan login credentials)",
        "Support SLA 8x5 (response dalam 4 jam di hari kerja untuk 3 bulan pertama)",
        "Monthly performance reports (uptime, load time, error rate, usage statistics)",
        "Improvement recommendations (saran fitur baru atau optimization based on usage data)"
      ]
    }
  ],

  "CRM System": [
    {
      phase: "1",
      title: "Mapping Customer Journey",
      description: "Di tahap ini kami akan riset mendalam tentang bagaimana customer Anda berinteraksi dengan bisnis. Kami akan interview team sales & CS, analisis chat history, review sales notes, dan mapping setiap tahap dari customer pertama kali tahu bisnis Anda sampai jadi repeat buyer. Tujuannya: pahami pain points di setiap tahap dan opportunity untuk improve dengan CRM.",
      duration: "1 minggu",
      icon: <Users className="w-5 h-5" />,
      deliverables: [
        "Customer journey map visual (diagram lengkap dari awareness → purchase → retention)",
        "Touchpoint analysis (semua titik interaksi: WhatsApp, email, phone call, visit toko, dll)",
        "Pain points list prioritized (masalah terbesar yang harus diselesaikan duluan)",
        "Opportunity recommendations (fitur CRM apa yang paling impact untuk bisnis Anda)"
      ]
    },
    {
      phase: "2",
      title: "Setup Database Customer",
      description: "Kami akan migrate semua data customer existing (dari Excel, Google Sheets, WhatsApp contacts, notes sales, dll) ke database CRM yang terstruktur. Data akan di-clean (hapus duplikat, format konsisten), normalize (semua field standard), dan di-categorize (segmentasi berdasarkan value, behavior, atau kriteria lain yang Anda mau). Database ini akan jadi single source of truth untuk semua data customer.",
      duration: "1-2 minggu",
      icon: <Database className="w-5 h-5" />,
      deliverables: [
        "Clean customer database (semua data customer terpusat, tidak ada duplikat, format konsisten)",
        "Segmentation setup (customer di-group otomatis: Hot/Warm/Cold leads, VIP customer, Inactive, dll)",
        "Import tools (bisa upload data massal dari Excel/CSV kapan saja)",
        "Data validation rules (sistem auto-detect kalau ada data tidak valid)"
      ]
    },
    {
      phase: "3",
      title: "Build CRM Features",
      description: "Ini fase development utama. Kami akan build platform CRM lengkap dengan fitur contact management (profile customer detail), interaction tracking (log semua komunikasi via WhatsApp/email/phone/meeting), sales pipeline (visual board untuk track progress deals), dan follow-up automation (sistem auto-remind sales untuk follow-up di waktu yang tepat). Semua di-design supaya mudah dipakai dan mobile-friendly.",
      duration: "4-6 minggu",
      icon: <Settings className="w-5 h-5" />,
      deliverables: [
        "CRM platform web & mobile (bisa akses di laptop dan HP, data sinkron real-time)",
        "Automation rules (auto-assign leads, auto-remind follow-up, auto-move pipeline stage, dll)",
        "Email templates library (20+ template email professional siap pakai untuk berbagai situasi)",
        "Activity timeline (history lengkap semua interaksi dengan customer dalam satu timeline)",
        "Reports & analytics dashboard (conversion rate, sales performance, customer lifetime value, dll)"
      ]
    },
    {
      phase: "4",
      title: "Integration & Testing",
      description: "Kami akan connect CRM dengan tools yang sudah team pakai sehari-hari (WhatsApp Business API, Gmail/Outlook, Google Calendar, dll) supaya workflow tidak berubah drastis. Semua integration akan di-test dengan skenario real untuk memastikan data flow lancar. Quality assurance team akan test 100+ scenarios dan fix semua bugs yang ditemukan sebelum launch.",
      duration: "1-2 minggu",
      icon: <Zap className="w-5 h-5" />,
      deliverables: [
        "WhatsApp Business API integration (chat masuk otomatis masuk CRM, bisa reply dari CRM)",
        "Email integration (email sync 2-way, bisa send & receive dari CRM)",
        "Calendar integration (meeting auto-save ke customer timeline)",
        "Test report lengkap (dokumentasi 100+ test scenarios dan hasilnya)",
        "Bug-free guarantee (semua critical & major bugs sudah fixed)"
      ]
    },
    {
      phase: "5",
      title: "Team Onboarding",
      description: "Kami akan training team sales & CS cara menggunakan CRM secara efektif. Training akan hands-on (praktik langsung) dengan data real, bukan cuma teori. Kami juga akan share best practices dari 100+ klien lain bagaimana maximize CRM untuk boost conversion. Setelah training, tim kami akan standby support 3 bulan untuk help troubleshooting dan answer questions kapan saja.",
      duration: "1 minggu",
      icon: <TrendingUp className="w-5 h-5" />,
      deliverables: [
        "Training session 2-3 jam (hands-on, praktik langsung dengan data real)",
        "Video tutorial library (rekaman training + tutorial spesifik per fitur)",
        "User manual lengkap bahasa Indonesia (PDF + online, bisa search)",
        "Best practices SOP (workflow recommendations based on 100+ clients experience)",
        "3 bulan ongoing support (email, WhatsApp, remote support kalau ada issue)"
      ]
    }
  ],

  "Sales Management": [
    {
      phase: "1",
      title: "Analisis Sales Process",
      description: "Kami akan observasi dan mapping sales process Anda dari awal sampai akhir: dari lead generation, qualification, proposal, negotiation, sampai closing. Kami akan interview sales team untuk understand workflow mereka, identifikasi tahap mana yang paling lama (bottleneck), mana yang sering bikin leads drop, dan mana yang bisa di-automate untuk save waktu. Goal: punya process flow yang clear dan tahu exactly di mana bisa improve.",
      duration: "1 minggu",
      icon: <BarChart3 className="w-5 h-5" />,
      deliverables: [
        "Process flowchart visual (diagram lengkap setiap tahap sales dari lead → closing)",
        "Bottleneck analysis report (identifikasi 3-5 tahap yang paling slow/problematic)",
        "Automation opportunities list (task mana yang bisa di-automate untuk efficiency)",
        "Current vs ideal process comparison (gap analysis)"
      ]
    },
    {
      phase: "2",
      title: "Lead Scoring Setup",
      description: "Kami akan buat sistem scoring supaya sales team tahu mana leads yang paling berpotensi closing (hot leads) dan harus di-prioritize. Scoring based on criteria seperti: budget (ada budget atau tidak), authority (decision maker atau tidak), need (urgent atau tidak), timeline (mau beli kapan). Leads akan auto-categorized jadi Hot/Warm/Cold based on total score, supaya sales bisa fokus effort ke yang paling promising.",
      duration: "1 minggu",
      icon: <TrendingUp className="w-5 h-5" />,
      deliverables: [
        "Scoring criteria matrix (point untuk setiap faktor: budget, authority, need, timeline, dll)",
        "Lead categories definition (Hot: score 80-100, Warm: 50-79, Cold: <50 dengan actionable next steps)",
        "Priority rules automation (hot leads auto-assign ke senior sales, warm ke junior, dll)",
        "Score calculation formula (transparent logic bagaimana score dihitung)"
      ]
    },
    {
      phase: "3",
      title: "Build Sales Platform",
      description: "Development platform sales lengkap dengan lead management (input & track semua leads), pipeline tracking (visual kanban board untuk monitor progress setiap deal), dan automated email sequences (follow-up emails otomatis based on lead behavior). Platform akan punya reminder system untuk sales (notif kalau ada yang perlu di-follow-up) dan reporting dashboard (conversion rate, sales performance, revenue tracking). Mobile-friendly supaya sales bisa akses di lapangan.",
      duration: "3-4 minggu",
      icon: <Settings className="w-5 h-5" />,
      deliverables: [
        "Sales dashboard complete (overview semua leads, deals, dan performance metrics di satu tempat)",
        "Pipeline stages customizable (bisa set sendiri stages sesuai sales process Anda)",
        "Email automation sequences (10+ template email untuk berbagai scenarios: welcome, follow-up, proposal, dll)",
        "Task & reminder system (auto-remind sales untuk follow-up based on lead stage)",
        "Mobile app or responsive web (akses platform dari HP Android/iOS)"
      ]
    },
    {
      phase: "4",
      title: "Analytics & Forecasting",
      description: "Kami akan setup analytics dashboard untuk track metrics penting seperti: conversion rate per stage, average deal size, sales cycle length, win/loss ratio, dan performance per sales person. Kami juga akan build forecasting model yang predict revenue bulan/quarter depan based on current pipeline dan historical closing rate. Manager bisa lihat siapa top performer dan siapa yang perlu coaching.",
      duration: "1-2 minggu",
      icon: <BarChart3 className="w-5 h-5" />,
      deliverables: [
        "Analytics dashboard real-time (conversion rate, deal value, cycle time, win rate di satu view)",
        "Forecast model predictive (prediksi revenue 1-3 bulan ke depan dengan confidence level)",
        "Performance metrics per sales (leaderboard, individual targets vs actuals, improvement suggestions)",
        "Custom reports generator (bisa bikin report sendiri sesuai kebutuhan dengan drag-drop)"
      ]
    },
    {
      phase: "5",
      title: "Launch & Optimization",
      description: "Platform akan di-deploy dan kami akan monitor adoption rate (berapa % sales team yang aktif pakai). Kami akan collect feedback from users tentang fitur apa yang helpful dan apa yang kurang, kemudian optimize platform based on real usage patterns. Kalau ada sales yang resistance, kami akan assist dengan additional training atau simplify workflow. Goal: 90%+ adoption rate dalam 1 bulan.",
      duration: "Ongoing",
      icon: <Zap className="w-5 h-5" />,
      deliverables: [
        "Live platform production-ready (URL + credentials untuk semua sales team)",
        "Weekly usage reports (siapa login berapa kali, fitur mana yang paling sering dipakai, dll)",
        "Continuous improvement roadmap (list fitur yang akan ditambahkan based on feedback)",
        "Monthly review sessions (video call untuk discuss performance dan plan improvements)"
      ]
    }
  ],

  "Customer Support": [
    {
      phase: "1",
      title: "Analisis Pertanyaan Customer",
      description: "Kami akan collect dan analisis semua pertanyaan customer yang masuk selama 2-4 minggu terakhir (dari WhatsApp, email, DM Instagram, phone call, dll). Kami akan kategorisasi berdasarkan tema (misal: pertanyaan harga, jam operasional, cara order, status pengiriman, komplain, dll) dan hitung frekuensi setiap kategori. Ini untuk tahu pertanyaan mana yang paling sering (bisa di-handle chatbot) dan mana yang complex (perlu human). Kami juga akan draft response templates untuk setiap pertanyaan umum.",
      duration: "1 minggu",
      icon: <Database className="w-5 h-5" />,
      deliverables: [
        "FAQ database terstruktur (100+ pertanyaan umum dengan jawaban yang sudah divalidasi)",
        "Question categories breakdown (% distribusi pertanyaan per kategori dengan priority ranking)",
        "Response templates library (jawaban siap pakai untuk 50+ pertanyaan paling sering)",
        "Escalation criteria (kapan chatbot harus transfer ke human support)"
      ]
    },
    {
      phase: "2",
      title: "Design Chatbot Flow",
      description: "Berdasarkan analisis di fase 1, kami akan design conversation flow untuk chatbot. Flow ini akan include greeting, menu utama pertanyaan, follow-up questions untuk clarification, dan handoff ke human kalau chatbot tidak bisa solve. Kami akan buat decision tree yang smart - chatbot tidak cuma jawab pertanyaan tapi juga bisa qualify leads (misal: tanya budget berapa, butuh kapan, dll). Flow akan di-design supaya feel natural, tidak robotic, dan fast (max 2-3 questions untuk get answer).",
      duration: "1 minggu",
      icon: <Settings className="w-5 h-5" />,
      deliverables: [
        "Chatbot flowchart visual (diagram lengkap semua possible conversation paths)",
        "Conversation scripts bahasa Indonesia natural (tidak kaku, friendly tapi professional)",
        "Escalation rules automated (trigger apa yang bikin chatbot transfer ke human: keywords, sentiment, complexity)",
        "Fallback responses (jawaban default kalau chatbot tidak paham pertanyaan)"
      ]
    },
    {
      phase: "3",
      title: "Build AI Chatbot",
      description: "Development chatbot dengan Natural Language Processing (NLP) supaya bisa understand bahasa Indonesia yang casual (misal: 'brp hrgny kak?' akan dipahami sebagai pertanyaan harga). Chatbot akan diintegrate dengan knowledge base dari fase 1 dan punya learning capability (makin banyak interaksi, makin smart). Kami akan build admin panel untuk CS team bisa monitor chat, take over kalau perlu, dan update responses. Chatbot bisa deployed di WhatsApp, website widget, atau platform lain sesuai kebutuhan.",
      duration: "2-3 minggu",
      icon: <Zap className="w-5 h-5" />,
      deliverables: [
        "Working chatbot dengan NLP bahasa Indonesia (bisa understand typo, slang, singkatan)",
        "Admin panel untuk monitor & manage (lihat semua chat, analytics, update knowledge base)",
        "Multi-channel deployment (WhatsApp, web chat widget, bisa tambah Instagram/Telegram nanti)",
        "Analytics tracking realtime (berapa chat masuk, berapa solved by bot, satisfaction rate)",
        "Handoff mechanism smooth (transfer ke human tanpa customer perlu repeat pertanyaan)"
      ]
    },
    {
      phase: "4",
      title: "Ticketing System",
      description: "Untuk pertanyaan yang tidak bisa solved by chatbot, kami akan build ticketing system untuk track sampai resolved. Setiap ticket punya unique ID, akan auto-assigned ke CS team member based on workload atau specialty, dan ada SLA monitoring (alert kalau ticket > 4 jam belum direspond). Manager bisa lihat dashboard: berapa open tickets, average resolution time, CS performance, customer satisfaction score. Customer bisa track status ticket mereka sendiri.",
      duration: "1-2 minggu",
      icon: <Users className="w-5 h-5" />,
      deliverables: [
        "Ticketing platform complete (create, assign, track, close tickets dengan notes lengkap)",
        "Auto-assignment rules intelligent (distribute tickets based on availability, expertise, workload)",
        "SLA monitoring & alerts (email/notif kalau ticket breach SLA: 4 jam untuk urgent, 24 jam untuk normal)",
        "Customer portal (customer bisa cek status ticket + chat history kapan saja)",
        "Performance dashboard (metrics: first response time, resolution time, satisfaction per CS)"
      ]
    },
    {
      phase: "5",
      title: "Continuous Learning",
      description: "Chatbot akan di-monitor performance-nya setiap minggu: berapa % pertanyaan yang bisa dijawab dengan akurat, berapa yang di-escalate, customer satisfaction score berapa. Kami akan review chat logs untuk identifikasi pertanyaan baru yang belum ada di knowledge base, kemudian update chatbot supaya bisa handle. Kami juga akan analisis feedback dari CS team dan customers untuk improve response quality dan add new features kalau perlu. Target: accuracy rate 85%+ dan satisfaction 4.5+/5.",
      duration: "Ongoing",
      icon: <TrendingUp className="w-5 h-5" />,
      deliverables: [
        "Weekly performance reports (accuracy rate, escalation rate, satisfaction score dengan trending)",
        "Updated knowledge base (tambah 10-20 Q&A baru setiap bulan based on new patterns)",
        "Improvement plan quarterly (roadmap fitur baru atau enhancement berdasarkan data)",
        "Monthly review call (diskusi performance, share insights, plan optimization)"
      ]
    }
  ],

  "Process Automation": [
    {
      phase: "1",
      title: "Mapping Proses Manual",
      description: "Kami akan interview team Anda untuk identifikasi semua task repetitif yang memakan waktu setiap hari (misal: download report dari 5 sistem, compile ke Excel, kirim email, update database, dll). Kami akan time audit: track berapa lama setiap task, berapa sering dilakukan per hari/minggu, siapa yang mengerjakan. Kemudian kami akan prioritize mana yang paling impact kalau di-automate (yang paling sering dan paling lama). Goal: dapat list lengkap automation candidates dengan estimated time saving.",
      duration: "1 minggu",
      icon: <Database className="w-5 h-5" />,
      deliverables: [
        "Process documentation lengkap (step-by-step setiap proses manual dengan screenshot)",
        "Time audit report (berapa jam per minggu dihabiskan untuk setiap task repetitif)",
        "Automation candidates prioritized (ranking berdasarkan impact vs effort)",
        "ROI estimation per automation (berapa jam saved, berapa cost saved per bulan)"
      ]
    },
    {
      phase: "2",
      title: "Design Workflow Automation",
      description: "Untuk setiap automation candidate, kami akan design workflow: apa trigger-nya (misal: setiap pagi jam 8, atau setiap kali ada file baru di folder, atau setiap kali customer checkout), apa actions yang perlu dilakukan (download, process, upload, send email, update database), dan apa exception handling-nya (kalau error, kirim alert ke siapa). Workflow akan di-visualize dalam flowchart supaya Anda bisa review dan approve sebelum development.",
      duration: "1 minggu",
      icon: <Settings className="w-5 h-5" />,
      deliverables: [
        "Workflow diagrams visual (flowchart setiap automation dengan triggers, actions, conditions)",
        "Trigger definitions clear (kapan automation jalan: schedule, event-based, or manual trigger)",
        "Action rules detailed (apa yang dilakukan automation step-by-step dengan business logic)",
        "Error handling plan (kalau ada error: retry berapa kali, alert siapa, fallback apa)"
      ]
    },
    {
      phase: "3",
      title: "Build Automation",
      description: "Development automation scripts dengan technology yang robust (Python, Node.js, atau tools seperti Zapier/Make untuk simple workflows). Kami akan integrate dengan semua tools yang Anda pakai (Google Sheets, databases, APIs, email, WhatsApp, dll). Automation akan punya scheduler (bisa set jalan jam berapa), logging (track setiap execution), dan monitoring dashboard (lihat status: success/failed). Security juga dijaga: credentials di-encrypt, access control, audit trail lengkap.",
      duration: "1-2 minggu",
      icon: <Zap className="w-5 h-5" />,
      deliverables: [
        "Automation scripts production-ready (code clean, documented, maintainable)",
        "Integration setup complete (connect semua tools dengan API/webhooks yang secure)",
        "Scheduler configured (cron jobs atau event triggers dengan timezone handling)",
        "Monitoring dashboard (realtime status, execution history, success/fail rate)",
        "Security implemented (encrypted credentials, access logs, role-based permissions)"
      ]
    },
    {
      phase: "4",
      title: "Testing & Monitoring",
      description: "Quality assurance team akan test automation dengan berbagai scenarios: normal case (happy path), edge cases (data tidak lengkap, format salah, dll), dan failure cases (API down, network timeout, dll). Kami akan validate output accuracy dengan cross-check manual untuk ensure data integrity. Kami juga akan setup alerting system: kalau automation fail, auto-send email/WhatsApp/Slack notification ke person in charge supaya bisa quick action.",
      duration: "1 minggu",
      icon: <CheckCircle2 className="w-5 h-5" />,
      deliverables: [
        "Test results comprehensive (dokumentasi 50+ test cases dengan pass/fail status)",
        "Error logs dashboard (lihat semua errors dengan timestamp, cause, dan resolution)",
        "Alert system configured (email, SMS, WhatsApp, atau Slack notifications untuk failures)",
        "Rollback plan (kalau automation error, bisa rollback ke manual process dengan SOP clear)"
      ]
    },
    {
      phase: "5",
      title: "Deploy & Optimize",
      description: "Automation akan di-deploy ke production dan kami akan monitor closely minggu pertama untuk ensure stability dan catch any issues early. Kami akan track metrics: berapa kali jalan, success rate berapa, berapa waktu yang di-save, apakah ada room for improvement. Setiap bulan kami akan review performance dan suggest optimizations atau expansion (automate proses lain yang related). Target: 99%+ success rate dan save minimal 10 jam per minggu.",
      duration: "Ongoing",
      icon: <TrendingUp className="w-5 h-5" />,
      deliverables: [
        "Live automation running 24/7 (no downtime, auto-restart kalau ada crash)",
        "Performance metrics dashboard (execution count, success rate, time saved, cost saved)",
        "Optimization reports monthly (insights untuk improve speed, reliability, atau add features)",
        "Expansion roadmap (list proses lain yang bisa di-automate next dengan priority)"
      ]
    }
  ],

  "Inventory Management": [
    {
      phase: "1",
      title: "Audit Stock Current",
      description: "Kami akan melakukan stock opname lengkap untuk semua produk yang Anda punya. Setiap item akan di-count, dicatat kondisinya (good/damaged/expired), dan di-categorize (misal: kategori produk, brand, supplier, price range). Kami akan setup SKU system yang sistematis (bisa alphanumeric dengan logic: kategori-brand-size) supaya mudah identify dan search. Kalau Anda punya multiple locations (gudang pusat, cabang, toko), semua akan di-map. Data akan di-input ke sistem supaya jadi baseline inventory Anda.",
      duration: "1 minggu",
      icon: <Database className="w-5 h-5" />,
      deliverables: [
        "Inventory list complete (semua SKU dengan quantity, lokasi, kondisi, nilai)",
        "SKU mapping system (structure SKU yang consistent dan easy to understand)",
        "Category structure (hierarchy kategori produk untuk grouping dan reporting)",
        "Baseline valuation (total nilai inventory Anda saat ini untuk accounting)"
      ]
    },
    {
      phase: "2",
      title: "Setup Tracking System",
      description: "Kami akan build platform untuk track stock movement real-time: setiap ada stock masuk (dari supplier atau return), keluar (untuk sales atau transfer), atau adjustment (rusak/hilang) akan langsung ter-record di system. Kami akan implement barcode atau QR code system supaya input cepat dan accurate (tinggal scan, tidak perlu manual ketik). Setiap lokasi penyimpanan (warehouse, rak, bin) akan punya code sendiri supaya tahu persis barang di mana. Platform akan accessible via web dan mobile app.",
      duration: "2-3 minggu",
      icon: <Settings className="w-5 h-5" />,
      deliverables: [
        "Tracking platform web & mobile (input/view stock movements dari mana saja real-time)",
        "Barcode/QR labels printed (label untuk semua SKU, bisa print ulang kapan saja)",
        "Location database detailed (mapping semua storage locations dengan capacity info)",
        "Scanner app mobile (pakai HP untuk scan barcode, auto-update stock)",
        "Stock movement history (audit trail lengkap siapa input apa kapan untuk accountability)"
      ]
    },
    {
      phase: "3",
      title: "Automated Reordering",
      description: "Kami akan setup reorder points untuk setiap SKU (misal: kalau stock Produk A tinggal 10 pcs, trigger reorder). System akan auto-generate Purchase Order (PO) draft yang tinggal approve. Kami akan integrate dengan supplier (via email atau API kalau mereka punya) supaya PO langsung terkirim. System akan track PO status (pending, confirmed, shipped, received) dan auto-update expected stock. Bisa juga setup automatic reorder untuk fast-moving items (tidak perlu manual approve, langsung PO otomatis).",
      duration: "2-3 minggu",
      icon: <Zap className="w-5 h-5" />,
      deliverables: [
        "Reorder rules per SKU (min stock level, reorder quantity, preferred supplier)",
        "PO automation system (auto-generate PO draft, auto-send ke supplier via email/API)",
        "Supplier portal optional (supplier bisa login, lihat PO, confirm, update status)",
        "Expected stock tracking (tahu stock on-hand + stock on-order untuk better planning)",
        "Reorder alerts configurable (email/WhatsApp notification kalau stock hampir habis)"
      ]
    },
    {
      phase: "4",
      title: "Analytics & Forecasting",
      description: "Kami akan build analytics dashboard untuk monitor inventory health: turnover rate (berapa kali stock terjual per bulan), aging analysis (stock mana yang slow-moving dan perlu promo), stockout frequency (berapa sering kehabisan stock), dll. Kami juga akan implement demand forecasting model based on historical sales data - predict berapa quantity yang perlu di-stock untuk 1-3 bulan ke depan. Ini akan help optimize inventory levels: tidak overstock (modal nganggur) dan tidak stockout (lost sales).",
      duration: "1-2 minggu",
      icon: <BarChart3 className="w-5 h-5" />,
      deliverables: [
        "Analytics dashboard comprehensive (turnover, aging, stockout rate, carrying cost, ABC analysis)",
        "Demand forecast model (prediksi demand 1-3 bulan dengan accuracy tracking)",
        "Stock optimization recommendations (berapa optimal stock level per SKU untuk minimize cost)",
        "Alerts for slow-moving stock (notifikasi produk yang < 1x turnover per quarter)",
        "Custom reports generator (bisa export report apapun yang Anda butuhkan)"
      ]
    },
    {
      phase: "5",
      title: "Multi-location Sync",
      description: "Kalau Anda punya multiple locations (warehouse, toko, cabang), kami akan setup system supaya semua sync real-time. Stock di lokasi A berkurang, langsung ter-update di dashboard. Kami akan build transfer management: bisa create transfer request antar lokasi, track in-transit stock, dan auto-update stock setelah received. Dashboard akan show unified view: total stock di semua lokasi, stock per location, dan recommendations untuk stock rebalancing (transfer dari lokasi yang overstock ke yang stockout).",
      duration: "1-2 minggu",
      icon: <TrendingUp className="w-5 h-5" />,
      deliverables: [
        "Multi-location setup (sync real-time stock across semua gudang/toko/cabang)",
        "Transfer management system (create, approve, track, receive inter-location transfers)",
        "Unified dashboard view (lihat stock breakdown per location dalam satu screen)",
        "Stock rebalancing alerts (notification kalau ada opportunity untuk transfer stock)",
        "Consolidated reporting (report aggregated untuk all locations atau breakdown per location)"
      ]
    }
  ],

  "Financial Management": [
    {
      phase: "1",
      title: "Setup Chart of Accounts",
      description: "Kami akan collaborate dengan accountant Anda (atau provide accounting consultation kalau belum punya) untuk setup chart of accounts yang sesuai dengan bisnis dan comply dengan standar akuntansi Indonesia. Kami akan categorize semua account types: assets, liabilities, equity, revenue, expenses dengan sub-categories yang detail. Setup juga include tax configuration (PPh, PPN, dll) dan opening balances dari existing data Anda. Semua account akan punya code dan description yang clear supaya mudah dipakai dan di-audit.",
      duration: "1-2 minggu",
      icon: <Database className="w-5 h-5" />,
      deliverables: [
        "Chart of accounts complete (struktur account standard dengan customization sesuai bisnis Anda)",
        "Account categories & sub-categories (detailed breakdown untuk granular tracking)",
        "Tax setup configured (PPh 21/23/25, PPN 11%, withholding tax rules)",
        "Opening balances migrated (import saldo awal dari data existing untuk continuity)",
        "Account mapping guide (dokumentasi account mana untuk transaction apa)"
      ]
    },
    {
      phase: "2",
      title: "Invoice & Payment System",
      description: "Kami akan build invoicing system yang professional: pilih customer, pilih items, auto-calculate total + tax, generate invoice PDF yang branded dengan logo Anda. Invoice bisa dikirim via email langsung dari system dengan payment link. Kami akan integrate payment gateway (Midtrans, Xendit, atau sejenisnya) supaya customer bisa bayar online (credit card, virtual account, e-wallet). System akan auto-update payment status, kirim receipt otomatis, dan update accounting records. Untuk B2B, bisa set payment terms (NET 30, NET 60) dengan auto-reminder untuk overdue invoices.",
      duration: "2-3 minggu",
      icon: <Settings className="w-5 h-5" />,
      deliverables: [
        "Invoice templates customizable (multiple templates, bisa branded dengan logo & company info)",
        "Payment gateway integrated (Midtrans/Xendit: credit card, VA, QRIS, e-wallet)",
        "Auto-email invoices & receipts (professional PDF attachment dengan payment instructions)",
        "Payment tracking dashboard (aging analysis, overdue alerts, collection follow-up)",
        "Recurring invoices optional (auto-generate monthly invoices untuk subscription customers)"
      ]
    },
    {
      phase: "3",
      title: "Expense Tracking",
      description: "Kami akan setup expense management supaya team bisa submit expenses dengan mudah: upload foto nota via mobile app, system akan OCR (read text dari foto) untuk extract amount, date, merchant. Employee tinggal categorize (transport, meal, supplies, dll) dan submit. Manager bisa approve/reject dari dashboard dengan 1-click. Approved expenses akan masuk accounting records otomatis dan queue untuk reimbursement. Bisa juga set budget per department atau per project, system akan alert kalau budget exceeded.",
      duration: "1-2 minggu",
      icon: <Zap className="w-5 h-5" />,
      deliverables: [
        "Expense module mobile-friendly (submit expense via HP: foto nota + form)",
        "OCR receipt scanning (auto-extract amount, date, merchant dari foto untuk faster input)",
        "Multi-level approval workflow (employee → manager → finance, customizable per department)",
        "Budget tracking per department (set budget limits, real-time tracking, overspending alerts)",
        "Reimbursement queue (list approved expenses ready to pay dengan batch payment option)"
      ]
    },
    {
      phase: "4",
      title: "Financial Reporting",
      description: "System akan auto-generate financial reports standard: Profit & Loss (laporan laba rugi), Balance Sheet (neraca), Cash Flow Statement (arus kas), dan Trial Balance. Reports bisa di-view untuk periode apapun (bulan ini, quarter, year-to-date, custom date range) dengan comparison (vs bulan lalu, vs tahun lalu). Kami juga akan build custom dashboard dengan key metrics yang Anda perlu monitor daily (revenue, expenses, cash balance, AR/AP aging). Semua reports bisa di-export ke Excel atau PDF untuk share atau archive.",
      duration: "2-3 minggu",
      icon: <BarChart3 className="w-5 h-5" />,
      deliverables: [
        "Standard financial reports (P&L, Balance Sheet, Cash Flow sesuai standar akuntansi)",
        "Custom dashboards (real-time metrics: revenue, profit margin, burn rate, runway)",
        "Period comparison features (MoM, YoY, budget vs actual dengan variance analysis)",
        "Export to Excel/PDF (download reports dalam berbagai format untuk distribution)",
        "Scheduled reports (auto-email reports setiap akhir bulan ke stakeholders)"
      ]
    },
    {
      phase: "5",
      title: "Integration & Compliance",
      description: "Kami akan integrate dengan internet banking (BCA, Mandiri, dll) supaya transactions dari bank auto-masuk ke system dan bisa di-reconcile dengan accounting records (matching payments dengan invoices/expenses). Tax engine akan calculate PPh dan PPN otomatis untuk setiap transaction. System akan generate tax reports (SPT Masa PPh, SPT Masa PPN) yang tinggal submit ke DJP. Compliance monitoring akan alert kalau ada potential issue (misal: expense tanpa nota, transaction tanpa tax invoice). Semua data akan di-backup daily ke cloud untuk disaster recovery.",
      duration: "2-3 minggu",
      icon: <TrendingUp className="w-5 h-5" />,
      deliverables: [
        "Bank integration (auto-import transactions dari internet banking untuk reconciliation)",
        "Tax calculation engine (auto-calculate PPh 21/23, PPN 11% sesuai regulations)",
        "Tax reports generator (SPT Masa, rekapitulasi faktur pajak, withholding tax reports)",
        "Compliance alerts (notifikasi untuk missing documents, tax deadlines, audit trails)",
        "Daily cloud backup (automated backup ke AWS/GCP dengan 99.999% durability guarantee)"
      ]
    }
  ]
};

export default function SolutionWorkflow({ solutionType }: SolutionWorkflowProps) {
  const workflow = workflowData[solutionType] || workflowData["Process Automation"];

  return (
    <div className="mt-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h4 className="font-bold text-xl mb-3">🗺️ Alur Penyelesaian Masalah Anda</h4>
        <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Begini langkah demi langkah cara kami menyelesaikan masalah bisnis Anda secara profesional dan terukur
        </p>
        <Badge className="mt-3 bg-green-50 text-green-700 border-green-200">
          ✅ Tingkat Kesuksesan 95%+ dari 100+ Klien
        </Badge>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600" />

        {/* Steps */}
        <div className="space-y-6">
          {workflow.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-20"
            >
              {/* Phase Badge */}
              <div className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                {step.phase}
              </div>

              {/* Content Card */}
              <Card className="p-4 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-bold text-base">{step.title}</h5>
                      <Badge variant="outline" className="text-xs">
                        {step.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="ml-14 mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Yang Anda Terima di Tahap Ini:
                  </p>
                  <div className="space-y-2">
                    {step.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm bg-green-50 text-green-800 px-3 py-2 rounded-lg"
                      >
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Arrow to next step */}
              {index < workflow.length - 1 && (
                <div className="absolute left-8 -bottom-3 transform -translate-x-1/2">
                  <ArrowRight className="w-5 h-5 text-blue-400 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-600 rounded-full">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div>
              <h5 className="font-bold text-lg">Siap Mulai Selesaikan Masalah Bisnis Anda?</h5>
              <p className="text-sm text-gray-600">
                Proses di atas sudah teruji untuk <strong>100+ klien</strong> dari berbagai industri
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-green-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">95%</div>
              <div className="text-xs text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">100+</div>
              <div className="text-xs text-gray-600">Klien Puas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.9/5</div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
          </div>

          <p className="text-sm text-gray-600 italic text-center">
            "Kami tidak hanya build aplikasi, tapi menyelesaikan masalah bisnis Anda secara menyeluruh"
          </p>
        </div>
      </Card>
    </div>
  );
}
