---
layout: post
title: "[Coding Test] 택배 상자 꺼내기"
date: 2025-04-02 23:00:00 +/-TTTT
categories: [Conding Test]
---

# 📌 택배 상자 꺼내기 (python)
```python
def solution(n, w, num):
    # 1-2층 위아래층을 합하면 12+1 (w*2*1층+1)
    # 2-3층 그다음 위아래층을 합하면 24+1 (w*2*2층+1)
    # 3-4층 그다음 위아래층을 합하면 36+1 (w*2*3층+1)
    # 위의 박스가 n보다 작으면 그 상자는 있을테니 빼면됨
    # 위의 박스가 n을 넘으면 아무것도 없으니 거기서 중단
    # ex) n=22, w=6, num=8
    # num이 8이면 22보다 작아 상자가 있을테니 answer += 1
    # num이 8이면 8/6+1=2층이니 w*2*2층+1을 적용해 위층은 25-8=17임
    # 17은 22보다 작으니 상자가 있을테니 answer += 1
    # 17은 3층일테니 w*6+1 적용해 37-17=20
    # 20은 있으니 answer += 1
    # 20은 4층일테니 w*8+1 적용, 49-20=29
    # 29는 22보다 크니 중단
    under_box = num
    above_box = answer = 0
    
    if (n >= num):
        answer += 1
    
    while(above_box < n):
        under_box_floor = int(under_box/w)+1
        if(under_box % w == 0):
            under_box_floor -= 1
        above_box = w*2*under_box_floor+1 - under_box 
    
        if (above_box <= n):
            answer += 1 
            under_box = above_box 
    
    return answer
```
