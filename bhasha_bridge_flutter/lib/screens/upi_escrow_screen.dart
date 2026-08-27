import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class UpiEscrowScreen extends StatefulWidget {
  const UpiEscrowScreen({super.key});

  @override
  State<UpiEscrowScreen> createState() => _UpiEscrowScreenState();
}

class _UpiEscrowScreenState extends State<UpiEscrowScreen> {
  double amount = 650000;
  String vpa = "bhashabridge@icici";
  String status = "PENDING";

  void _launchUpiApp() async {
    final String upiUrl =
        "upi://pay?pa=$vpa&pn=BhashaBridge%20Escrow&am=$amount&cu=INR&tn=Karnataka%20MSME%20Escrow";
    final Uri uri = Uri.parse(upiUrl);

    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Launching UPI App Payment...')),
      );
    }
  }

  void _simulateLock() {
    setState(() {
      status = "LOCKED";
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0A0D16),
        title: const Text('Dynamic UPI 2.0 Escrow Lock'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF0E1422),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: const Color(0x4010B981)),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      const Text('NPCI UPI 2.0 Escrow', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: status == "LOCKED" ? const Color(0x3010B981) : const Color(0x30F59E0B),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          status == "LOCKED" ? "ESCROW LOCKED" : "AWAITING LOCK",
                          style: TextStyle(
                            color: status == "LOCKED" ? const Color(0xFF10B981) : const Color(0xFFF59E0B),
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  QrImageView(
                    data: "upi://pay?pa=$vpa&am=$amount&cu=INR&tn=Karnataka%20MSME",
                    version: QrVersions.auto,
                    size: 180,
                    backgroundColor: Colors.white,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    '₹${amount.toStringAsFixed(0)}',
                    style: const TextStyle(fontSize: 24, fontWeight: FontWeight.black, color: Color(0xFFF59E0B)),
                  ),
                  const Text('Karnataka Supplier Milestone Lock', style: TextStyle(color: Colors.grey, fontSize: 11)),
                  const SizedBox(height: 20),
                  ElevatedButton.icon(
                    onPressed: _launchUpiApp,
                    icon: const Icon(Icons.account_balance_wallet),
                    label: const Text('Pay via Installed UPI App'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF10B981),
                      foregroundColor: Colors.black,
                      minimumSize: const Size.fromHeight(46),
                    ),
                  ),
                  const SizedBox(height: 10),
                  OutlinedButton.icon(
                    onPressed: _simulateLock,
                    icon: const Icon(Icons.lock_outline),
                    label: const Text('Simulate Test Payment Lock'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: const Color(0xFFF59E0B),
                      minimumSize: const Size.fromHeight(46),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
