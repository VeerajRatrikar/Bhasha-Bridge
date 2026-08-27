import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0A0D16),
        title: const Text(
          'Bhasha Bridge • Karnataka Console',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none, color: Color(0xFFF59E0B)),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Banner Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF0E1422), Color(0xFF1E283D)],
                ),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: const Color(0x40F59E0B)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0x30F59E0B),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text(
                      'Digital India Bhashini NLU Core',
                      style: TextStyle(
                        color: Color(0xFFF59E0B),
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Speak in Kannada to Source MSME Suppliers',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.black,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Connect with 12,400+ verified manufacturers across 31 Karnataka Districts.',
                    style: TextStyle(color: Colors.grey, fontSize: 12),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            const Text(
              'Karnataka Industrial Corridors',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: 12),

            _buildClusterCard(
              title: 'Peenya CNC Precision Hub',
              kannada: 'ಪೀಣ್ಯ ಸಿಎನ್‌ಸಿ',
              desc: '5-Axis Haas CNC milling, precision spur gears, ISO 9001.',
              icon: Icons.settings,
            ),
            const SizedBox(height: 12),
            _buildClusterCard(
              title: 'Mysuru Silk & Weaving Corridor',
              kannada: 'ಮೈಸೂರು ರೇಷ್ಮೆ',
              desc: 'Organic Mulberry raw silk yarn spools, Silk Mark certified.',
              icon: Icons.gradient,
            ),
            const SizedBox(height: 12),
            _buildClusterCard(
              title: 'Belagavi Foundry & Hydraulics',
              kannada: 'ಬೆಳಗಾವಿ ಫೌಂಡ್ರಿ',
              desc: 'Ductile iron casting & NABL 25-bar hydrostatic valves.',
              icon: Icons.build,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildClusterCard({
    required String title,
    required String kannada,
    required String desc,
    required IconData icon,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF0E1422),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white10),
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: const Color(0x20F59E0B),
            child: Icon(icon, color: const Color(0xFFF59E0B)),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                    Text(
                      kannada,
                      style: const TextStyle(
                        color: Color(0xFFF59E0B),
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  desc,
                  style: const TextStyle(color: Colors.grey, fontSize: 11),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
