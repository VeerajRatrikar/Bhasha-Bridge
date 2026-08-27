import 'package:flutter/material.dart';

class VoiceAsrScreen extends StatefulWidget {
  const VoiceAsrScreen({super.key});

  @override
  State<VoiceAsrScreen> createState() => _VoiceAsrScreenState();
}

class _VoiceAsrScreenState extends State<VoiceAsrScreen> {
  bool isRecording = false;
  String queryText = "ನನಗೆ ಪೀಣ್ಯದಿಂದ 500 Pcs Haas CNC gears ಬೇಕು, target budget ₹6.5 Lakhs";
  String category = "Peenya CNC Precision Engineering";
  String budget = "₹6,50,000";

  void _toggleMic() {
    setState(() {
      isRecording = !isRecording;
    });

    if (isRecording) {
      Future.delayed(const Duration(seconds: 2), () {
        if (mounted) {
          setState(() {
            isRecording = false;
            queryText = "ನನಗೆ ಮೈಸೂರಿನಿಂದ 1,000 Mtr Silk Yarn ಬೇಕು, budget ₹9.8 Lakhs";
            category = "Mysuru Silk & Weaving";
            budget = "₹9,85,000";
          });
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0A0D16),
        title: const Text('Bhashini Indic Voice ASR'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            const SizedBox(height: 20),
            Center(
              child: GestureDetector(
                onTap: _toggleMic,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  width: isRecording ? 120 : 100,
                  height: isRecording ? 120 : 100,
                  decoration: BoxDecoration(
                    color: isRecording ? Colors.red : const Color(0xFFF59E0B),
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: isRecording
                            ? Colors.red.withOpacity(0.5)
                            : const Color(0xFFF59E0B).withOpacity(0.3),
                        blurRadius: 20,
                        spreadRadius: 5,
                      )
                    ],
                  ),
                  child: Icon(
                    isRecording ? Icons.mic : Icons.mic_none,
                    size: 50,
                    color: Colors.black,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              isRecording
                  ? 'ಧ್ವನಿ ದಾಖಲಿಸಲಾಗುತ್ತಿದೆ... (Processing Audio)'
                  : 'Tap Microphone to Speak in Kannada',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
            ),

            const SizedBox(height: 30),

            // Extracted NLU Result Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF0E1422),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0x40F59E0B)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Extracted NLU Entities',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: const Color(0x3010B981),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Text(
                          'Confidence: 96.4%',
                          style: TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                      )
                    ],
                  ),
                  const Divider(color: Colors.white10, height: 20),
                  Text(
                    'Transcribed Speech:',
                    style: TextStyle(color: Colors.grey[400], fontSize: 11),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    queryText,
                    style: const TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.bold, fontSize: 13),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Category: $category', style: const TextStyle(fontSize: 11)),
                      Text('Budget: $budget', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.emeraldAccent)),
                    ],
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
