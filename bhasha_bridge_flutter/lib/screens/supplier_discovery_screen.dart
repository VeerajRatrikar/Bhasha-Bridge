import 'package:flutter/material.dart';

class SupplierDiscoveryScreen extends StatelessWidget {
  const SupplierDiscoveryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0A0D16),
        title: const Text('Karnataka MSME Supplier Discovery'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          TextField(
            decoration: InputDecoration(
              hintText: 'Search Peenya CNC, Mysuru Silk, Belagavi Valves...',
              prefixIcon: const Icon(Icons.search, color: Color(0xFFF59E0B)),
              filled: true,
              fillColor: const Color(0xFF0E1422),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
                borderSide: BorderSide.none,
              ),
            ),
          ),
          const SizedBox(height: 20),
          _buildSupplierCard(
            name: 'Balaji Silk & Textiles Ltd.',
            district: 'Mysuru Corridor (140km)',
            badge: 'Silk Mark Certified',
            rating: '4.9 ★',
          ),
          const SizedBox(height: 12),
          _buildSupplierCard(
            name: 'Peenya Precision CNC Hub',
            district: 'Bengaluru Peenya (15km)',
            badge: 'ISO 9001:2015',
            rating: '4.8 ★',
          ),
          const SizedBox(height: 12),
          _buildSupplierCard(
            name: 'Belagavi Foundry & Hydraulics',
            district: 'Belagavi Cluster (500km)',
            badge: 'NABL Tested',
            rating: '4.7 ★',
          ),
        ],
      ),
    );
  }

  Widget _buildSupplierCard({
    required String name,
    required String district,
    required String badge,
    required String rating,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF0E1422),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
              Text(rating, style: const TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.bold, fontSize: 12)),
            ],
          ),
          const SizedBox(height: 4),
          Text(district, style: const TextStyle(color: Colors.grey, fontSize: 11)),
          const SizedBox(height: 10),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(
              color: const Color(0x20F59E0B),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(badge, style: const TextStyle(color: Color(0xFFF59E0B), fontSize: 10, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }
}
