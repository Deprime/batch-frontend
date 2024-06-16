export default class Animate {
  /**
   * Random
   */
  random = (min: number, max: number) => Math.floor(Math.random() * max) + min;

  /**
   * Candy fly
   * @param {HTMLElement} element - form where will fly start
   * @param {HTMLElement} target - to where will fly end
   * @param {number} count - count of coins
   */
  candyFeed = (
      element: HTMLElement,
      target: HTMLElement,
      count: number,
    ) => {
      const targetRect = target.getBoundingClientRect();
      const targetX = targetRect.left + Math.floor(targetRect.width / 2.8);
      const targetY = targetRect.top + Math.floor(targetRect.height / 1.3);

      const rect = element.getBoundingClientRect();
      const x = rect.left + Math.floor(rect.width / 2);
      const y = rect.top + Math.floor(rect.height / 2);

      // Right or left
      let right = this.random(0, 10) >= 5;

      for (let i = 0; i < Math.floor(count); i++) {
        const icon = document.createElement('div');
        icon.className = 'canvas canvas-candy'
        icon.innerHTML = '<i class="candy candy--fly"></i>';
        const size = this.random(16, 16);
        icon.style.width = `${size}px`;
        icon.style.height = `${size}px`;
        right = !right;

        const baseDelta = this.random(70, 85);
        const deltaX = right ? (baseDelta + 15) * -1 : baseDelta;
        const deltaY = this.random(0, 90);

        icon.style.top = `${deltaY + y}px`;
        icon.style.left = `${deltaX + x}px`;
        icon.style.opacity = '0';
        icon.style.scale = '1.8';
        document.body.appendChild(icon);

        setTimeout(() => {
          window.requestAnimationFrame(() => {
            icon.style.opacity = '1';

            setTimeout(() => {
              icon.style.top = `${targetY - ~~(size / 2)}px`;
              icon.style.left = `${targetX - ~~(size / 2) + this.random(-20, 40)}px`;
              icon.style.scale = '1';
              setTimeout(() => {
                icon.style.opacity = '0';
                setTimeout(() => icon.parentElement.removeChild(icon), 1000);
              }, 200);
            }, 250);
          });
        }, i * 100);
      }
  };

  /**
   * Candy fly
   */
  tokenFly = (x: number, y: number, girlId: number, count: number) => {
      const btn = document.getElementById(`girl-${girlId}-clicker`);
      if (!btn) return;

      const icon = document.createElement('div');
      icon.className = 'canvas canvas-token'
      icon.innerHTML = `<i class="chan-token">+${count}</i>`;
      const size = this.random(16, 16);
      icon.style.width = `${size}px`;

      icon.style.top = `${y-30}px`;
      icon.style.left = `${x-10}px`;
      icon.style.scale = `0.5`;
      icon.style.opacity = '0.5';
      btn.appendChild(icon);

      const deltaY = 85;

      window.requestAnimationFrame(() => {
        icon.style.opacity = '1';
        icon.style.scale = `1.5`;

        setTimeout(() => {
          icon.style.left = `${x -15}px`;
          icon.style.top = `${y - deltaY}px`;
          setTimeout(() => {
            icon.style.opacity = '0';
            setTimeout(() => icon.parentElement.removeChild(icon), 1000);
          }, 250);
        }, 5);
      });
  };

  /**
   * egg fly
   * @param {HTMLElement} element - form where will fly start
   * @param {HTMLElement} target - to where will fly end
   * @param {number} count - count of coins
   */
  eggFly = (
    element: HTMLElement,
    target: HTMLElement,
    iconHtml: string,
    count: number,
  ) => {
    const targetRect = target.getBoundingClientRect();
    const targetX = targetRect.left + Math.floor(targetRect.width / 2.8);
    const targetY = targetRect.top + Math.floor(targetRect.height / 1.3);

    const rect = element.getBoundingClientRect();
    const x = rect.left + Math.floor(rect.width / 2);
    const y = rect.top + Math.floor(rect.height / 2);

    for (let i = 0; i < Math.floor(count); i++) {
      const icon = document.createElement('div');
      const elemtNavEggs = document.getElementById('nav-eggs');
      icon.className = 'el-canvas--egg'
      icon.innerHTML = iconHtml;
      const size = this.random(16, 16);
      icon.style.width = `${size}px`;
      icon.style.height = `${size}px`;
      icon.style.top = `${y - ~~(size / 1.8)}px`;
      icon.style.left = `${x - ~~(size / 1.8)}px`;
      icon.style.opacity = '1';
      document.body.appendChild(icon);

      setTimeout(() => {
        window.requestAnimationFrame(() => {
          const deltaY = 0;
          const deltaX = 0;

          icon.style.top = `${y - ~~(size / 2) + deltaY}px`;
          icon.style.left = `${x - ~~(size / 2) + deltaX}px`;
          icon.style.opacity = '1';
          icon.style.scale = '2.2';

          setTimeout(() => {
            icon.style.top = `${targetY - ~~(size / 2)}px`;
            icon.style.left = `${targetX - ~~(size / 2)}px`;
            // icon.style.left = `${targetX - ~~(size / 2) + this.random(-20, 40)}px`;
            icon.style.scale = '1';

            setTimeout(() => {
              elemtNavEggs.style.scale = '1.1';

              setTimeout(() => {
                elemtNavEggs.style.scale = '1'
              }, 300);

              icon.style.opacity = '0';
              setTimeout(() => icon.parentElement.removeChild(icon), 1000);
            }, 300);
          }, 750); // 500
        });
      }, i * 25);
    }
  };

  /**
   * Get element canter
   * @param {HTMLElement} element
   * @returns {{x: number, y: number}}
   */
  elementCenter = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const x = ~~(rect.left + rect.width / 2);
    const y = ~~(rect.top + rect.height / 2);
    return { x, y };
  };
}
