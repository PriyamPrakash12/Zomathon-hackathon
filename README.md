🚀 Project Overview
This project addresses critical data gaps in Kitchen Preparation Time (KPT) prediction and rider assignment systems within food delivery platforms.

Modern delivery ecosystems are data-dependent, but existing architectures often struggle with state inconsistencies, fragmented data, and limited real-world visibility, leading to inefficiencies from kitchen operations to rider dispatch.

🎯 Objective

To develop a data-aware, resilient, and automated system that enhances:

*   KPT prediction accuracy
*   Rider dispatch efficiency
*   Real-time operational visibility
*   Fair accountability between merchants and delivery partners

🔍 Problem Domains Addressed
1.  ⚠️ Asynchronous Handover Signalling ("False Ready" Problem)
    *   Detects discrepancies between digital order states and actual readiness.
    *   Prevents premature "ready" signals influenced by riders.
    *   Restores data integrity and accountability during arrival-to-handover.
2.  📊 Opaque Kitchen Load ("Hidden Surge" Problem)
    *   Addresses the lack of visibility into total kitchen workload.
    *   Incorporates external demand signals (offline orders, other platforms).
    *   Reduces model drift and ETA inaccuracies during peak hours.
3.  🤖 Manual Capacity Adjustment Limitations
    *   Eliminates reliance on manual merchant intervention.
    *   Introduces automated, passive telemetry ingestion.
    *   Enables real-time, adaptive KPT recalibration.
4.  🚴 Rider Utilization Inefficiencies
    *   Optimizes rider dispatch timing.
    *   Reduces wait times at pickup locations.
    *   Improves fleet efficiency and the delivery experience.

💡 Key Features
*   📡 Real-time telemetry integration for kitchen load estimation
*   🔄 State validation mechanisms for data consistency
*   🤖 Automated capacity detection (hardware-lite approach)
*   📈 Improved ETA prediction with reduced P90 error rates
*   🚴 Smarter rider assignment and reduced idle time
