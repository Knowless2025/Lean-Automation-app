import os
from google import genai

# 1. สร้าง client ก่อน (ตัวแปรนี้ต้องถูกสร้างก่อนถึงจะใช้งานได้)
client = genai.Client(api_key="AIzaSyAJ5hG2PJHaJOWgonKKdzjAR1l21Nt3E2c")

# 2. ค่อยเรียกใช้งาน client 
for chunk in client.models.generate_content_stream(
    model="gemini-3.1-pro-preview",
    contents="ดูไฟล์ผมทั้งหมดแล้วช่วยสร้างหน้า app ให้ผม แก้ไฟล์ matrix.jsx ตอนนี้มันแสดงผิดเพี้ยนอยากจะทำให้ดูดีเป็นมืออาชีพครับ"
):
    print(chunk.text, end="")